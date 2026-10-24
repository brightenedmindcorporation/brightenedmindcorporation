import type { Lesson } from "../types";

// French video tutorials for the lessons (YouTube, checked as embeddable when they were chosen).
// Key: "<level>-<lesson>". A lesson without an entry simply shows no video.
const IDS: Record<string, string> = {
  // Niveau 1
  "1-1": "lRyjLmP4OAs",
  "1-2": "TJOtf3nL5EY",
  "1-3": "grpuJxEkm4g",
  "1-4": "M7SM3urnETU",
  "1-5": "OMbQ0FWG5P8",
  "1-6": "kgXpCHOydTo",
  "1-7": "rvg-ZsAqInk",
  "1-8": "3AUwF4Jxq20",
  "1-9": "5CqaNHdzxcI",
  "1-10": "gdLnl_pV8Gs",
  "1-11": "r5-gBQQLXxk",
  "1-12": "zbZ4GYt8i_0",
  // Niveau 2
  "2-1": "2NCSPL-M6Uc",
  "2-2": "DJPGArAZzmQ",
  "2-3": "zW_2HFFGpHY",
  "2-4": "BkQjoAksKNk",
  "2-5": "71645Z8g7rY",
  "2-6": "u4oNEbY6QbA",
  "2-7": "Iag-161QKg8",
  "2-8": "wB0S3Ywp6HE",
  "2-9": "tMfsozXglds",
  "2-10": "fmeQpItYf9Y",
  "2-11": "ZaMV35GWZUU",
  "2-12": "T3o2UJL4f0c",
  // Niveau 3
  "3-1": "YZodwJIhHDM",
  "3-2": "fpaaMGVZm5Y",
  "3-3": "GunBbGTecfs",
  "3-4": "1yqF07ltnjk",
  "3-5": "JoYObjD-YSE",
  "3-6": "nuB1ED5e4A8",
  "3-7": "4mbIvczC-Ec",
  "3-8": "KMsXwOIvtKc",
  "3-9": "3Y7YupyPCtI",
  "3-10": "j7CwxD6dCi0",
  "3-11": "Zk_s2Xzjikc",
  "3-12": "jzovhBulMrg",
};

export function withVideos(level: number, lessons: Lesson[]): Lesson[] {
  return lessons.map((l) => {
    const key = `${level}-${l.id}`;
    const id = IDS[key];
    return { ...l, figure: key, ...(id ? { videoUrl: `https://www.youtube.com/watch?v=${id}` } : {}) };
  });
}
