// Non-language training programs (Bureautique, Visuel, Logiciels) that
// share the same self-service registration/approval/login system as the
// 6 languages in content/curriculum, but have no interactive lesson
// content of their own yet — they're presentation pages (app/academia/*)
// backed by a plain enrollment request. Kept separate from
// availableLanguages because that list is tied to real curriculum data
// (getLevelCurriculum lookups, level/lesson routes); mixing a program with
// no curriculum into it would break those routes.
export interface OtherProgram {
  code: string;
  slug: string;
  label: string;
}

export const otherPrograms: OtherProgram[] = [
  { code: "BUREAUTIQUE", slug: "bureautique", label: "Bureautique" },
  { code: "VISUEL", slug: "visuel", label: "Visuel & Audiovisuel" },
  { code: "LOGICIELS", slug: "logiciels", label: "Logiciels de Gestion" },
  { code: "DOMESTICA", slug: "domestica", label: "Formation BM Domestica (personnel domestique)" },
];

export function isOtherProgramCode(code?: string): boolean {
  return otherPrograms.some((p) => p.code === code);
}

export function getOtherProgramLabel(code?: string): string | undefined {
  return otherPrograms.find((p) => p.code === code)?.label;
}
