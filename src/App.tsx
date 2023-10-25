import MainPage from "./pages/mainPage";
import IntroPage from "./pages/introPage";
import PokemonDetails from "./pages/pokemonDetails";
import { PokemonDataProvider } from "./pages/pokemonContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <PokemonDataProvider>
        <Routes>
        <Route element={<MainPage />}>
          <Route index element={<IntroPage />} />
          <Route path="/pokemon/:name" element={<PokemonDetails />} />
        </Route>
        </Routes>
      </PokemonDataProvider>
    </BrowserRouter>
  );
}

export default App;
