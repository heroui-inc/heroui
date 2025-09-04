import {getRSS} from "@/lib/rss";

export const revalidate = false;

export const GET = () => {
  return new Response(getRSS(), {
    headers: {
      "Content-Type": "application/xml",
    },
  });
};
