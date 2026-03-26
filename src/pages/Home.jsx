import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import "../App.css";

function Home() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("");

  // 🔹 Buscar produtos
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then(res => res.json())
      .then(data => {
        setProdutos(data);
        setLoading(false);
      });
  }, []);

  // 🔹 Buscar categorias
  useEffect(() => {
    fetch("https://fakestoreapi.com/products/categories")
      .then(res => res.json())
      .then(data => setCategorias(data));
  }, []);

  // 🔹 Filtro
  const produtosFiltrados = categoriaSelecionada
    ? produtos.filter(p => p.category === categoriaSelecionada)
    : produtos;

  return (
    <div className="container">
      <h1>Produtos</h1>

      {/* 🔥 FILTRO */}
      <div className="filtros">
        <button
          className={categoriaSelecionada === "" ? "ativo" : ""}
          onClick={() => setCategoriaSelecionada("")}
        >
          Todos
        </button>

        {categorias.map(cat => (
          <button
            key={cat}
            className={categoriaSelecionada === cat ? "ativo" : ""}
            onClick={() => setCategoriaSelecionada(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 🔄 LOADING */}
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