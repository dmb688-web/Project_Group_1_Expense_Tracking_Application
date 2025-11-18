import { useState, useEffect } from "react";
import "./SearchBar.css";

function SearchBar() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (query.length > 1) {
      fetch(`/api/jobs/autocomplete?query=${query}`)
        .then((res) => res.json())
        .then((data) => setSuggestions(data));
    } else {
      setSuggestions([]);
    }
  }, [query]);

  return (
    <div className="search-container">
      <input
        className="search-bar"
        placeholder="Search jobs…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {suggestions.length > 0 && (
        <ul className="autocomplete-box">
          {suggestions.map((item, index) => (
            <li key={index} onClick={() => setQuery(item.job_title)}>
              {item.job_title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;
