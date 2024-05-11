import { getStore } from "@netlify/blobs";
import type { Context } from "@netlify/functions";

export default async (req: Request, context: Context) => {
  const construction = getStore("construction");
  await construction.set("nails", "For general carpentry");

  const beauty = getStore("beauty");
  await beauty.set("nails", "For formal events", {
    metadata: { material: "acrylic", sale: true },
  });

  return new Response("Nail blobs set for Construction and Beauty stores");
};
