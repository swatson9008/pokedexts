import { createContext, useContext, useState, ReactNode } from "react";

interface PokemonData {

}

interface PokemonDataContextType {
  pokemonData: PokemonData | null;
  storePokemonData: (data: PokemonData | null) => void;
}

const PokemonDataContext = createContext<PokemonDataContextType | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const usePokemonData = () => {
  const context = useContext(PokemonDataContext);
  if (context === null) {
    throw new Error("usePokemonData must be used within a PokemonDataProvider");
  }
  return context;
};

type PokemonDataProviderProps = {
  children: ReactNode;
};

export const PokemonDataProvider = ({ children }: PokemonDataProviderProps) => {
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
