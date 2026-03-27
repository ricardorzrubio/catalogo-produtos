import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import "../App.css";

function Home({ categoriaSelecionada }) {
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

  const produtosFiltrados = categoriaSelecionada
    ? produtos.filter(p => p.category === categoriaSelecionada)
    : produtos;

  return (
    <div className="container">
      <h1>Produtos</h1>

      {loading ? (
        <p className="loading">Carregando...</p>
      ) : (
        <div className="grid">
          {produtosFiltrados.map(prod => (
            <ProductCard key={prod.id} produto={prod} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;