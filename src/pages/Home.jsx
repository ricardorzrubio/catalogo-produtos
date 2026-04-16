import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../services/api"; // Importação do Service
import "../styles/pages/Home.css";

function Home({ categoriaSelecionada }) {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    // Chamada limpa através do service
    getProducts()
      .then(data => {
        setProdutos(data);
        setLoading(false);
      })
      .catch(err => {
        setErro(err.message);
        setLoading(false);
      });
  }, []);

  const produtosFiltrados = categoriaSelecionada
    ? produtos.filter(p => p.category === categoriaSelecionada)
    : produtos;

  if (loading) return <p className="loading-text">Carregando produtos...</p>;
  if (erro) return <p className="error-text">{erro}</p>;

  return (
    <main className="home-container">
      <h1 className="home-title">Produtos</h1>
      <div className="product-grid">
        {produtosFiltrados.map(prod => (
          <ProductCard key={prod.id} produto={prod} />
        ))}
      </div>
    </main>
  );
}

export default Home;