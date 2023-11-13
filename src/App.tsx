import MainPage from "./pages/mainPage";
import IntroPage from "./pages/introPage";
import PokemonDetails from "./pages/pokemonDetails";
import ListPage from "./pages/list";
import { PokemonDataProvider } from "./pages/pokemonContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <PokemonDataProvider>
        <Routes>
        <Route element={<MainPage />}>
          <Route index element={<IntroPage />} />
          <Route path="/list" element={<ListPage />} />
          <Route path="/pokemon/:name" element={<PokemonDetails />} />
        </Route>
        </Routes>
      </PokemonDataProvider>
    </BrowserRouter>
  );
}

export default App;
