import { getStore } from "@netlify/blobs";
import type { Context } from "@netlify/functions";
import type { Entry } from "~/types/entry";

export default async (req: Request, _: Context) => {
  const body = (await req.json()) as Entry;

  if (!body.uid) {
    return Response.json({ message: "Missing uid" }, { status: 400 });
  }

  if (!body.body) {
    return Response.json({ message: "Missing body" }, { status: 400 });
  }

  if (!body.files) {
    return Response.json({ message: "Missing files" }, { status: 400 });
  }

  const entries = getStore(`entries_${body.uid}`);

  const timestamp = Date.now().toLocaleString();

  // todo: do the AI magic here and add more things to the entry, but via background job
  // but it's only available in the netlify paid plan
  await entries.setJSON(timestamp, body, {
    metadata: {
      date: timestamp,
      files: body.files,
      uid: body.uid,
    },
  });

  return Response.json({ message: "Entry added" });
};
