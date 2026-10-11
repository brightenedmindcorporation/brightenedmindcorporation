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

export async function uploadToCloudinary(
  file: File,
  folder: string,
  resourceType: "image" | "video" | "raw" = "image"
): Promise<string> {
  if (!isCloudinaryConfigured()) {
    throw { status: 503, message: "Le service d'hébergement de fichiers n'est pas configuré côté serveur." };
  }
  ensureConfigured();

  const buffer = Buffer.from(await file.arrayBuffer());

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: resourceType,
        // "raw" is for non-image/video files (PDF, DOCX...) — keeping the
        // original filename/extension means the stored URL downloads with
        // a sensible name instead of a bare Cloudinary id.
        ...(resourceType === "raw" ? { use_filename: true, unique_filename: true, filename_override: file.name } : {}),
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
