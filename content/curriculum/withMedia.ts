import type { Lesson } from "./types";

/**
 * Adds the diagram and the French video tutorial to the lessons of a course.
 * `prefix` keys the diagram ("lg-1-3"); `videos` maps "<level>-<lesson>" to a YouTube id (a lesson without one shows no video).
 */
export function withMedia(prefix: string, videos: Record<string, string>, level: number, lessons: Lesson[]): Lesson[] {
  return lessons.map((l) => {
    const key = `${level}-${l.id}`;
    const id = videos[key];
    return { ...l, figure: `${prefix}-${key}`, ...(id ? { videoUrl: `https://www.youtube.com/watch?v=${id}` } : {}) };
  });
}
