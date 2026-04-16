import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import "../App.css";

function Home({ categoriaSelecionada }) {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null); // Estado para erro

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then(res => {
        if (!res.ok) throw new Error("Erro ao buscar produtos");
        return res.json();
      })
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

  if (loading) return <p className="loading">Carregando produtos...</p>;
  if (erro) return <p className="error" style={{color: 'red', textAlign: 'center'}}>{erro}</p>;

  return (
    <div className="container">
      <h1>Produtos</h1>
      <div className="grid">
        {produtosFiltrados.map(prod => (
          <ProductCard key={prod.id} produto={prod} />
        ))}
      </div>
    </div>
  );
}

export default Home;