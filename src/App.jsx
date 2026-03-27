import { useState } from "react";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";

function App() {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("");

  return (
    <>
      <Header
        setCategoriaSelecionada={setCategoriaSelecionada}
        categoriaSelecionada={categoriaSelecionada}
      />

      <Routes>
        <Route
          path="/"
          element={
            <Home categoriaSelecionada={categoriaSelecionada} />
          }
        />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </>
  );
}

export default App;