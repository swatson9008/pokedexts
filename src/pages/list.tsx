import React, { useState, useEffect } from "react";
import listOfPokemon from "../libraries/pokemonlist.json";
import { formatString, getIDNo } from "../components/formatString";
import Search from "../components/search";
import { useNavigate } from "react-router-dom";
import { usePokemonData } from "./pokemonContext";
import { PokemonListStyle } from "../styles/listDisplayStyle";
import ListAlgos from "./listAlgos";

interface Pokemon {
  name: string;
  url: string;
  types: { name: string; url: string }[];
}

const ListPage: React.FC = () => {
  const navigate = useNavigate();
  const { storePokemonData } = usePokemonData();
  const masterList = listOfPokemon.slice(0, 1017)

  const [visibleEntries, setVisibleEntries] = useState<number>(50);
  const totalEntries = masterList.length;
  const [pokemonList, setPokemonList] = useState<Pokemon[]>(masterList);
  const backupList: Pokemon[] = masterList;

  const handleSearch = async (pokemonName: string) => {
    try {
      const result = await Search(pokemonName);
      if (result) {
        storePokemonData(result);
        navigate(`/pokemon/${result.pokeName}`);
      }
    } catch (error) {
      console.error(error);
      alert("Please enter a proper name for a Pokemon species");
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleScroll = () => {
    const scrollPosition = window.innerHeight + window.scrollY;
    const pageHeight = document.documentElement.scrollHeight;

    if (scrollPosition >= pageHeight - 200 && visibleEntries < totalEntries) {
      setVisibleEntries((prev) => prev + 20);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [visibleEntries, totalEntries, handleScroll]);

  const displayedList = pokemonList.slice(0, visibleEntries).map((pokemon: Pokemon) => (
    <div key={pokemon.name} onClick={() => handleSearch(pokemon.name)}>
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getIDNo(
          pokemon.url
        )}.png`}
        alt={pokemon.name}
      />
      {formatString(pokemon.name)}
    </div>
  ));

  return (
    <div>
      <ListAlgos setList={setPokemonList} list={pokemonList} backupList={backupList} />
      <PokemonListStyle>{displayedList}</PokemonListStyle>
    </div>
  );
};
export default ListPage;
