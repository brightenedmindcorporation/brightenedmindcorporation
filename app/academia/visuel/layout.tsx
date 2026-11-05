import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Formation visuel et audiovisuel — BM Academia",
  description:
    "Design, image et audiovisuel : une formation en ligne en 3 niveaux, avec exercices pratiques, quiz et certificat.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
