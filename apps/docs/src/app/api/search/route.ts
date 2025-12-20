import type {NextRequest} from "next/server";

import {createFromSource} from "fumadocs-core/search/server";

import {source} from "@/lib/source";

// Create a filtered source that excludes releases pages
const filteredSource = {
  ...source,
  getPages() {
    return source.getPages().filter((page) => {
      // Filter out releases pages by checking slugs, URL, and path
      const firstSlug = page.slugs[0];
      const url = page.url;
      const path = page.path;

      return firstSlug !== "releases" && !url.includes("/releases") && !path.includes("releases");
    });
  },
} as typeof source;

const {GET: originalGET} = createFromSource(filteredSource);

// Wrap the GET handler to filter out releases results from the response
export async function GET(request: NextRequest) {
  const response = await originalGET(request);

  // Clone the response to read it without consuming the original
  const contentType = response.headers.get("content-type") || "";

  if (!contentType.includes("application/json")) {
    // If it's not JSON, return as-is (might be a stream or other format)
    return response;
  }

  try {
    const data = await response.json();

    // Helper function to check if an item is a releases entry
    const isReleases = (item: any): boolean => {
      const url = item?.url || item?.href || "";
      const id = item?.id || "";
      const title = item?.title || "";
      const path = item?.path || "";

      return (
        url.includes("/releases") ||
        id.includes("/releases") ||
        path.includes("releases") ||
        title.toLowerCase().includes("releases")
      );
    };

    // Filter out releases results from the search response
    if (Array.isArray(data)) {
      const filtered = data.filter((item: any) => !isReleases(item));

      return Response.json(filtered, {
        headers: response.headers,
        status: response.status,
        statusText: response.statusText,
      });
    }

    // If the response structure is different, try to filter nested results
    if (data && typeof data === "object") {
      const filtered: any = {};

      for (const [key, value] of Object.entries(data)) {
        if (Array.isArray(value)) {
          filtered[key] = (value as any[]).filter((item: any) => !isReleases(item));
        } else if (value && typeof value === "object" && "results" in value) {
          // Handle Orama-style search results
          filtered[key] = {
            ...value,
            results: Array.isArray((value as any).results)
              ? (value as any).results.filter((item: any) => !isReleases(item))
              : (value as any).results,
          };
        } else {
          filtered[key] = value;
        }
      }

      return Response.json(filtered, {
        headers: response.headers,
        status: response.status,
        statusText: response.statusText,
      });
    }

    return response;
  } catch (error) {
    // If parsing fails, return the original response
    return response;
  }
}
