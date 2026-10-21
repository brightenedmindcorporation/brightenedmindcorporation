import { cachetSvg, sealSvg } from "@/lib/seals";

/** The administration's seal, cachet and signature as images for the PDFs (client side only). */
export interface StampImages {
  seal: string;
  cachet: string;
  signature: string | null;
}

function rasterize(svg: string, width: number, height: number): Promise<string> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml;charset=utf-8" }));
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      canvas.getContext("2d")!.drawImage(img, 0, 0, width, height);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL("image/png"));
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Sceau illisible."));
    };
    img.src = url;
  });
}

let signatureCache: Promise<string | null> | null = null;
/** Jordi Mukosa's signature (transparent PNG), reduced so the PDF stays light. */
function loadSignature(maxSize = 700): Promise<string | null> {
  if (!signatureCache) {
    signatureCache = new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const scale = Math.min(1, maxSize / Math.max(img.width, img.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        canvas.getContext("2d")!.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/png"));
      };
      img.onerror = () => {
        signatureCache = null;
        resolve(null);
      };
      img.src = "/seals/signature-jordi-mukosa.png";
    });
  }
  return signatureCache;
}

/** Company seal and the general cachet of the administration (dated with `dateText`), plus the signature. */
export async function loadStampImages(dateText: string): Promise<StampImages> {
  const [seal, cachet, signature] = await Promise.all([
    rasterize(sealSvg("company", { size: 600, idPrefix: "pdf-seal" }), 600, 600),
    rasterize(cachetSvg("company", { size: 900, date: dateText, idPrefix: "pdf-cachet" }), 900, 450),
    loadSignature(),
  ]);
  return { seal, cachet, signature };
}
