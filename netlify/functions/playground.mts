import { getStore } from "@netlify/blobs";
import type { Context } from "@netlify/edge-functions";

export default async (req: Request, context: Context) => {
  const construction = getStore("construction");

  await construction.setJSON("nails", { type: "common", finish: "bright" });

  return new Response("Nail blob set in JSON for Construction store");
};
