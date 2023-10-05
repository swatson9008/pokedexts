import { useState, ChangeEvent } from "react";
import Search from '../components/search'

export default function SearchBox() {
  const [pokeSearch, setSearch] = useState<string>("");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleSearch = () => {
   Search(pokeSearch)

  }
  return (
    <div className="searchMain">
      <div className="searchContainer">
        <input
          type="text"
          id="searchInput"
          placeholder="Enter a Pokemon"
          value={pokeSearch}
          onChange={handleInputChange}
        />
        <button id="searchButton" onClick={() => handleSearch()}>
          Search
        </button>
      </div>
    </div>
  );
}
