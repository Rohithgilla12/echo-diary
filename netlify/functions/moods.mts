import { getStore } from "@netlify/blobs";
import type { Context } from "@netlify/functions";

export default async (req: Request, _: Context) => {
  const uid = req.headers.get("uid");

  if (!uid) {
    return Response.json({ message: "Missing uid" }, { status: 400 });
  }

  const moods = getStore(`moods_${uid}`);

  const { blobs } = await moods.list();

  const moodsList = await Promise.all(
    blobs.map(async (blob) => {
      const data = await moods.get(blob.key, {
        consistency: "strong",
        type: "json",
      });

      return data;
    })
  );

  return Response.json({
    moods: moodsList,
  });
};
