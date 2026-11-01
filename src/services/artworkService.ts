import type { SearchResponse } from "../types/SearchResponse";

const BASE_URL = "https://collectionapi.metmuseum.org/public/collection/v1";

export const getArtworkIds = async (searchText: string) => {
  try {
    const url = new URL(
      `${BASE_URL}.1/search?hasImages=true&q=${encodeURIComponent(searchText)}`,
    );

    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(
        `Could not fetch artworks: ${res.status} ${res.statusText}`,
      );
    }

    const data: SearchResponse = await res.json();

    return data;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Network request failed";

    throw new Error(message);
  }
};
