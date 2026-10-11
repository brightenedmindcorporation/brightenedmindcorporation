"use client";

import { Trophy } from "lucide-react";
import { generateCertificatePdf } from "@/lib/academy/certificatePdf";

interface CertificateButtonProps {
  studentName: string;
  levelTitle: string;
  average: number;
  certificateId: string;
  className?: string;
  onGenerated?: () => void;
}

export default function CertificateButton({ studentName, levelTitle, average, certificateId, className, onGenerated }: CertificateButtonProps) {
  const generate = () => {
    generateCertificatePdf({ studentName, levelTitle, average, certificateId });
    onGenerated?.();
  };

  return (
    <button
      onClick={generate}
      className={className ?? "bg-amber-500 hover:bg-amber-600 text-black px-8 py-4 rounded-2xl font-bold transition-all shadow-lg inline-flex items-center justify-center gap-2"}
    >
      <Trophy size={18} /> Download Certificate
    </button>
  );
}
