import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import History from "./pages/History"; // Importar aqui
import { CartProvider } from "./contexts/CartContext";
import "./styles/App.css";

function App() {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("");

  return (
    <CartProvider>
      <Header
        setCategoriaSelecionada={setCategoriaSelecionada}
        categoriaSelecionada={categoriaSelecionada}
      />
      <Routes>
        <Route path="/" element={<Home categoriaSelecionada={categoriaSelecionada} />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/history" element={<History />} /> {/* Nova Rota */}
      </Routes>
    </CartProvider>
  );
}

export default App;