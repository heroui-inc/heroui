import path from "path";
import fs from "fs";

/**
 * Read the information for each sponsor from `.all-sponsorsrc` file
 */
export function getAllSponsors() {
  const sponsorsRcPath = path.resolve(".sponsorsrc");
  const openCollectiveSponsors = JSON.parse(fs.readFileSync(sponsorsRcPath, "utf-8"));
  const patreonSponsors = [
    {
      MemberId: "000000",
      tier: "Gold Sponsor 🥇",
      currency: "USD",
      lastTransactionAt: "2025-02-15 00:00",
      lastTransactionAmount: 100,
      name: "Mochii.AI",
      image: "/sponsors/000000.webp",
      website: "https://www.mochii.ai",
    },
  ];

  return [...openCollectiveSponsors, ...patreonSponsors];
}
