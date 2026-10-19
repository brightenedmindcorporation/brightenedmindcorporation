import type { PlacementContent } from "./types";
import english from "./english";
import french from "./french";
import spanish from "./spanish";
import portuguese from "./portuguese";
import swahili from "./swahili";
import chinese from "./chinese";

const registry: Record<string, PlacementContent> = { english, french, spanish, portuguese, swahili, chinese };

export function getPlacementContent(langSlug: string): PlacementContent | null {
  return registry[langSlug] ?? null;
}

export type { PlacementContent, Q } from "./types";
