import type { MetObject } from "../types/MetObject";

type ArtworkSearchResultCardProps = {
  artwork: MetObject;
};

export default function ArtworkSearchResultCard({
  artwork,
}: ArtworkSearchResultCardProps) {
  return (
    <>
      <div>
        <h2>{artwork.title}</h2>
        <img src={artwork.primaryImageSmall} alt={artwork.title} />
      </div>
    </>
  );
}
