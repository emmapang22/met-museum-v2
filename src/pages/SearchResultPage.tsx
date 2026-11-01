import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { getArtworkIds } from "../services/artworkService";
import type { SearchResponse } from "../types/SearchResponse";

export default function SearchResultPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q")?.trim() ?? "";
  const [searchResponse, setSearchResponse] = useState<SearchResponse>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    const fetchArtworkIds = async () => {
      setLoading(true);
      setError(null);
      setSearchResponse(undefined);

      if (!query) {
        setSearchResponse({ total: 0, objectIDs: [] });
        setLoading(false);
        return;
      }

      try {
        const response: SearchResponse = await getArtworkIds(query);

        if (!ignore) {
          setSearchResponse(response);
        }
      } catch (error) {
        if (!ignore) {
          setError(
            error instanceof Error
              ? error.message
              : "Could not load artwork search result",
          );
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    fetchArtworkIds();

    return () => {
      ignore = true;
    };
  }, [query]);

  return (
    <>
      <h1>Results for "{query}"</h1>

      {loading && <p>Loading results...</p>}

      {!loading && error && <p role="alert">Error: {error}</p>}

      {!loading && !error && searchResponse?.objectIDs?.length ? (
        searchResponse.objectIDs.map((id) => <p key={id}>Artwork ID: {id}</p>)
      ) : (
        <p>No artworks found for "{query}"</p>
      )}
    </>
  );
}
