import { useState } from "react";
import { colorTypes } from "../components/colorTypes";
import { PokeTypeDisplay } from "../styles/displayResultStyles/pokemonTypeDisplay";
import { AlgoStyle } from "../styles/algoStyle";
import { PokemonClient } from "pokenode-ts";
import { formatString, getIDNo } from "../components/formatString";
import { GlowFilter } from "../styles/glowFilter";
interface Pokemon {
  name: string;
  url: string;
  types: { name: string; url: string }[];
}


interface ListAlgosProps {
  setList: React.Dispatch<React.SetStateAction<Pokemon[]>>;
  backupList: Pokemon[];
  list: Pokemon[];
}

const ListAlgos: React.FC<ListAlgosProps> = ({ setList, backupList, list }) => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const api = new PokemonClient();
  const sortAlpha = () => {
    const sortedList = [...list].sort((a, b) => a.name.localeCompare(b.name));
    setList(sortedList);
  };

  const typeSort = async (type: string) => {
    if (selectedTypes.length === 2) {
      alert('You can only select up to two types at a time.');
      return;
    }
    const updatedList: Pokemon[] = [];
    const promises = list.map(async (pokemon) => {
      try {
        const pokemonData = await api.getPokemonById(
          parseInt(getIDNo(pokemon.url))
        );
        if (
          pokemonData.types[0].type.name === type ||
          (pokemonData.types[1] && pokemonData.types[1].type.name === type)
        ) {
          updatedList.push(pokemon);
        } else {
          return "";
        }
      } catch (error) {
        console.error(
          `Error fetching Pokemon data for ${pokemon.name}:`,
          error
        );
      }
    });

    await Promise.all(promises);

    const sortedList = updatedList.sort(
      (a, b) => parseInt(getIDNo(a.url)) - parseInt(getIDNo(b.url))
    );

    setList(sortedList);
    console.log(list)
    setSelectedTypes((prevSelectedTypes) => [...prevSelectedTypes, type]);
  };

  const reverseAlpha = () => {
    const sortedList = [...list].sort((a, b) => b.name.localeCompare(a.name));
    setList(sortedList);
  };

  const resetAlgo = () => {
    setList([...backupList]);
    setSelectedTypes([]);
  };

  const sortByNo = () => {
    const sortedList = [...list].sort(
      (a, b) => parseInt(getIDNo(a.url)) - parseInt(getIDNo(b.url))
    );
    setList(sortedList);
  };

  const sortByReverseNo = () => {
    const sortedList = [...list].sort(
      (a, b) => parseInt(getIDNo(b.url)) - parseInt(getIDNo(a.url))
    );
    setList(sortedList);
  };

  const sortGen = async (genNumber: number | null) => {
    if (genNumber === null) {
      return;
    }
  
    if (genNumber === null) {
      return;
    }
    if (genNumber === 1) {
      const genList = backupList.slice(0, 151);
      setList(genList);
    }
    if (genNumber === 2) {
      const genList = backupList.slice(151, 251);
      setList(genList);
    }
    if (genNumber === 3) {
      const genList = backupList.slice(251, 386);
      setList(genList);
    }
    if (genNumber === 4) {
      const genList = backupList.slice(386, 493);
      setList(genList);
    }
    if (genNumber === 5) {
      const genList = backupList.slice(493, 649);
      setList(genList);
    }
    if (genNumber === 6) {
      const genList = backupList.slice(649, 721);
      setList(genList);
    }
    if (genNumber === 7) {
      const genList = backupList.slice(721, 809);
      setList(genList);
    }
    if (genNumber === 8) {
      const genList = backupList.slice(809, 905);
      setList(genList);
    }
    if (genNumber === 9) {
      const genList = backupList.slice(905, 1017);
      setList(genList);
    }
      
  };
  

  const generationOptions = Array.from({ length: 9 }, (_, index) => ({
    value: (index + 1).toString(),
    label: `Generation ${index + 1}`,
  }));

  return (
    <AlgoStyle>
      <button onClick={resetAlgo}>Reset</button>
      <button onClick={sortByNo}>Sort By Dex Order</button>
      <button onClick={sortByReverseNo}>Sort By Reverse Dex Order</button>
      <button onClick={sortAlpha}>Sort Alphabetically</button>
      <button onClick={reverseAlpha}>Sort Reverse Alphabetically</button>

      <div>
        <label htmlFor="dropdown">Select a generation:</label>
        <select id="dropdown" onChange={(e) => sortGen(Number(e.target.value))}>
          <option value="">Select a generation</option>
          {generationOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div className="typeFilters">
        {Object.entries(colorTypes).map(
          ([type]) =>
            type !== "???" && (
              <GlowFilter isSelected={selectedTypes.includes(type)}>
                <PokeTypeDisplay type={type} onClick={() => typeSort(type)}>
                  {formatString(type)}
                </PokeTypeDisplay>
              </GlowFilter>
            )
        )}
      </div>
    </AlgoStyle>
  );
};

export default ListAlgos;
