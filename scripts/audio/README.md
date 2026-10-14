# Lesson audio (pre-recorded clips)

Every phrase a student can "listen to" in a lesson has an mp3 clip hosted on
Cloudinary (`bm-audio/<language>/<clipId>.mp3`). The lesson page plays the clip
(and keeps it in the browser's cache for offline use); if a clip is missing it
falls back to the device's own voice.

The clip name is derived from the language + exact text (`lib/academy/audioClips.ts`),
so **when lesson text changes, regenerate**: new/changed phrases get new clips,
unchanged ones are skipped.

```bash
node --experimental-strip-types --no-warnings scripts/audio/collect.mjs            # list every phrase
node --experimental-strip-types --no-warnings scripts/audio/generate.mjs [lang…]   # make the mp3s (free neural voices)
node --experimental-strip-types --no-warnings scripts/audio/upload.mjs   [lang…]   # push them to Cloudinary
```

- Languages: english, french, spanish, portuguese, chinese, swahili (omit to do all).
- Work files (texts + mp3s) go to `../bm-audio` (outside the repo; override with `AUDIO_WORK_DIR`).
- Both steps are resumable — stop and restart any time.
- Voices (see `lib.mjs`): Aria (en-US), Denise (fr-FR), Elvira (es-ES), Raquel (pt-PT),
  Xiaoxiao (zh-CN), Zuri (sw-KE) — Microsoft Edge neural voices via `msedge-tts`.
- Upload needs the `CLOUDINARY_*` variables from `.env.local`.
