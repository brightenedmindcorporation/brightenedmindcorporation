import "server-only";
import { v2 as cloudinary } from "cloudinary";

/**
 * Server-only Cloudinary upload helper, used for announcement photos/
 * videos. Chosen over Firebase Storage because Storage needs the paid
 * Blaze plan — Cloudinary's free tier needs no billing info at all.
 */

export function isCloudinaryConfigured(): boolean {
  return Boolean(
    process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET
  );
}

let configured = false;
function ensureConfigured() {
  if (configured) return;
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  configured = true;
}

/**
 * Core uploader taking an already-read Buffer. Callers that also need the
 * file's bytes for something else (e.g. emailing it as an attachment)
 * should read `file.arrayBuffer()` ONCE and pass that buffer here, rather
 * than letting this function read the `File` a second time — some runtimes'
 * `File`/`Blob` implementations don't reliably support re-reading the same
 * instance, which silently produced an empty/corrupt upload before this was
 * split out.
 */
export async function uploadBufferToCloudinary(
  buffer: Buffer,
  filename: string,
  folder: string,
  resourceType: "image" | "video" | "raw" = "image"
): Promise<string> {
  if (!isCloudinaryConfigured()) {
    throw { status: 503, message: "Le service d'hébergement de fichiers n'est pas configuré côté serveur." };
  }
  ensureConfigured();

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: resourceType,
        // "raw" is for non-image/video files (PDF, DOCX...) — keeping the
        // original filename/extension means the stored URL downloads with
        // a sensible name instead of a bare Cloudinary id.
        ...(resourceType === "raw" ? { use_filename: true, unique_filename: true, filename_override: filename } : {}),
      },
      (error, result) => {
        if (error || !result) {
          reject(error || new Error("Échec de l'upload Cloudinary."));
          return;
        }
        resolve(result.secure_url);
      }
    );
    uploadStream.end(buffer);
  });
}

export async function uploadToCloudinary(
  file: File,
  folder: string,
  resourceType: "image" | "video" | "raw" = "image"
): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());
  return uploadBufferToCloudinary(buffer, file.name, folder, resourceType);
}
