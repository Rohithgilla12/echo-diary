import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Mood } from "~/types/entry";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isAudioFile = (url: string) => {
  return url.endsWith(".mp3") || url.endsWith(".wav") || url.endsWith(".ogg");
};

export const isImageFile = (url: string) => {
  return (
    url.endsWith(".jpg") ||
    url.endsWith(".jpeg") ||
    url.endsWith(".png") ||
    url.endsWith(".gif")
  );
};

export const getPublicUrls = (fileIds: string[]) => {
  const client = useSupabaseClient();

  return fileIds.map((fileId) => {
    return client.storage.from("entries").getPublicUrl(fileId).data.publicUrl;
  });
};

export const groupByMood = (moods: Mood[]) => {
  const grouped: { [key: string]: Mood[] } = {}; // Add index signature

  moods.forEach((mood: Mood) => {
    if (!grouped[mood.mood]) {
      grouped[mood.mood] = [];
    }

    grouped[mood.mood].push(mood);
  });

  return grouped;
};

export const groupByMoodCount = (moods: Mood[]) => {
  const grouped = groupByMood(moods);

  return Object.keys(grouped).map((key) => {
    return {
      name: key,
      count: grouped[key].length,
    };
  });
};
