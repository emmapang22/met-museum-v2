import { useState } from "react";
import { useNavigate } from "react-router";

export default function Header() {
  const [searchText, setSearchText] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const query = searchText.trim();
    if (!query) return;

    navigate(`/search?${new URLSearchParams({ q: query })}`);
  };

  return (
    <header className="bg-red">
      <h2>Met Gallery</h2>

      <form method="GET" onSubmit={handleSubmit}>
        <label htmlFor="searchArtwork">Search artworks:</label>

        <input
          type="text"
          name="searchArtwork"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        <button>Search</button>
      </form>
    </header>
  );
}
