import {getRSS} from "@/lib/rss";

export const revalidate = false;

export const GET = async () => {
  const rss = await getRSS();

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
};
