import MainPage from "./pages/mainPage";
import IntroPage from "./pages/introPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route index element={<IntroPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
