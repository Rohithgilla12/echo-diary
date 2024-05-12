import { getStore } from "@netlify/blobs";
import type { Context } from "@netlify/functions";

export default async (req: Request, context: Context) => {
  const uid = req.headers.get("uid");

  if (!uid) {
    return Response.json({ message: "Missing uid" }, { status: 400 });
  }

  const entries = getStore(`entries_${uid}`);

  const { blobs } = await entries.list();

  const entriesList = await Promise.all(
    blobs.map(async (blob) => {
      const data = await entries.get(blob.key, {
        consistency: "strong",
        type: "json",
      });

      return data;
    })
  );

  return Response.json({
    entries: entriesList,
  });
};
