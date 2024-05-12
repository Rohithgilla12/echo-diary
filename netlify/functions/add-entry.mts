import { getStore } from "@netlify/blobs";
import type { Context } from "@netlify/functions";

export default async (req: Request, context: Context) => {
  const body = await req.json();
  const entries = getStore("entries");

  return Response.json({ message: "Entry added" });
};
