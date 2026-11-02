import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { getArtworks } from "../services/artworkService";
import type { MetObject } from "../types/MetObject";
import ArtworkSearchResultCard from "../components/ArtworkSearchResultCard";

export default function SearchResultPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q")?.trim() ?? "";
  const [artworks, setArtworks] = useState<MetObject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    const fetchArtworks = async () => {
      setLoading(true);
      setError(null);
      setArtworks([]);

      if (!query) {
        setArtworks([]);
        setLoading(false);
        return;
      }

      try {
        const response: MetObject[] = await getArtworks(query);

        if (!response) {
          setError("Could not fetch artworks");
        }

        if (!ignore) {
          setArtworks(response);
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

    fetchArtworks();

    return () => {
      ignore = true;
    };
  }, [query]);

  return (
    <>
      <h1>Results for "{query}"</h1>

      {loading && <p>Loading results...</p>}

      {!loading && error && <p role="alert">Error: {error}</p>}

      {!loading && !error && artworks.length === 0 && (
        <p>No artworks found for "{query}"</p>
      )}

      {!loading &&
        !error &&
        artworks.length > 0 &&
        artworks.map((artwork) => (
          <ArtworkSearchResultCard key={artwork.objectID} artwork={artwork} />
        ))}
    </>
  );
}
