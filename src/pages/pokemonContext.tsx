import { createContext, useContext, useState } from "react";

interface PokemonData {
  // Define the structure of your PokemonData here
}

// Create a type for the context
interface PokemonDataContextType {
  pokemonData: PokemonData | null;
  storePokemonData: (data: PokemonData | null) => void;
}

const PokemonDataContext = createContext<PokemonDataContextType | null>(null);

export const usePokemonData = () => {
  const context = useContext(PokemonDataContext);
  if (context === null) {
    throw new Error("usePokemonData must be used within a PokemonDataProvider");
  }
  return context;
};

export const PokemonDataProvider = ({ children }) => {
  const [pokemonData, setPokemonData] = useState<PokemonData | null>(null);

  const storePokemonData = (data: PokemonData | null) => {
    setPokemonData(data);
  };

  return (
    <PokemonDataContext.Provider value={{ pokemonData, storePokemonData }}>
      {children}
    </PokemonDataContext.Provider>
  );
};
