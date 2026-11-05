import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BM Domestica — Personnel domestique qualifié à Lubumbashi",
  description:
    "Recrutement, formation et placement de personnel domestique : aides ménagères, nounous, cuisiniers. Présélection rigoureuse, formation pratique et suivi de satisfaction avec BM Domestica.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
