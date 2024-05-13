import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

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
