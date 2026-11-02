import type { MetObject } from "../types/MetObject";
import type { SearchResponse } from "../types/SearchResponse";

const BASE_URL = "https://collectionapi.metmuseum.org/public/collection/v1";

export const searchArtworks = async (
  searchText: string,
): Promise<SearchResponse> => {
  try {
    const url = new URL(`${BASE_URL}.1/search`);

    url.search = new URLSearchParams({
      q: searchText,
      hasImages: "true",
      limit: "20",
      offset: "0",
    }).toString();

    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(
        `Could not fetch search result for artworks: ${res.status} ${res.statusText}`,
      );
    }

    const data: SearchResponse = await res.json();
    // console.log(data);

    return data;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Network request failed";

    throw new Error(message);
  }
};

export const getArtworkObject = async (id: number) => {
  try {
    const url = new URL(`${BASE_URL}/objects/${id}`);

    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(
        `Could not fetch artwork objects: ${res.status} ${res.statusText}`,
      );
    }

    const data: MetObject = await res.json();
    // console.log(data);

    return data;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Network request failed";

    throw new Error(message);
  }
};

export const getArtworks = async (searchText: string): Promise<MetObject[]> => {
  try {
    const { objectIDs } = await searchArtworks(searchText);

    if (!objectIDs?.length) return [];

    const artworkPromises = Promise.all(
      objectIDs.map((id) => getArtworkObject(id)),
    );

    console.log(artworkPromises);

    return artworkPromises;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Network request failed";
    throw new Error(message);
  }
};
