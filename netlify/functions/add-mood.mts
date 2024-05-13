import { getStore } from "@netlify/blobs";
import type { Context } from "@netlify/functions";

export default async (req: Request, _: Context) => {
  const body = (await req.json()) as {
    mood: string;
    uid: string;
    date: string;
  };

  console.log(body);

  if (!body.uid) {
    return Response.json({ message: "Missing uid" }, { status: 400 });
  }

  if (!body.date) {
    return Response.json({ message: "Missing date" }, { status: 400 });
  }

  if (!body.mood) {
    return Response.json({ message: "Missing mood" }, { status: 400 });
  }

  const moods = getStore(`moods_${body.uid}`);

  await moods.setJSON(body.date, body, {
    metadata: {
      uid: body.uid,
    },
  });

  return Response.json({ message: "Mood added" });
};
