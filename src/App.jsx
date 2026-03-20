import { useEffect, useState } from "react";
import Header from "./components/Header";
import ProductCard from "./components/ProductCard";
import "./App.css";

function App() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then(res => res.json())
      .then(data => {
        setProdutos(data);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Header />

      <div className="container">
        <h1>Produtos</h1>

        {/* 🔄 LOADING */}
        {loading ? (
          <p className="loading">Carregando...</p>
        ) : (
          <div className="grid">
            {produtos.map(prod => (
              <ProductCard key={prod.id} produto={prod} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default App;