import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { getCategories } from "../services/api";
import "../styles/components/Header.css";

function Header({ setCategoriaSelecionada, categoriaSelecionada }) {
  const [categorias, setCategorias] = useState([]);
  const [menuAberto, setMenuAberto] = useState(false);
  
  const { cart } = useCart();
  const navigate = useNavigate();
  const totalItens = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Mapeamento de ícones para as categorias da API
  const iconesCategorias = {
    "electronics": "🔌",
    "jewelery": "💎",
    "men's clothing": "👕",
    "women's clothing": "👗"
  };

  useEffect(() => {
    function tratarRedimensionamento() {
      if (window.innerWidth > 1024) setMenuAberto(false);
    }
    window.addEventListener("resize", tratarRedimensionamento);
    return () => window.removeEventListener("resize", tratarRedimensionamento);
  }, []);

  useEffect(() => {
    getCategories()
      .then(data => setCategorias(data))
      .catch(err => console.error("Erro ao carregar categorias", err));
  }, []);

  return (
    <header className="header">
      <div className="hamburger" onClick={() => setMenuAberto(!menuAberto)}>☰</div>

      <h2 className="logo" onClick={() => { setCategoriaSelecionada(""); navigate("/"); }}>
        SwiftShop
      </h2>

      <nav className="menu">
        <button className={categoriaSelecionada === "" ? "active" : ""} onClick={() => { setCategoriaSelecionada(""); navigate("/"); }}>
          Todos
        </button>
        {categorias.map(cat => (
          <button key={cat} className={categoriaSelecionada === cat ? "active" : ""} onClick={() => { setCategoriaSelecionada(cat); navigate("/"); }}>
            {cat}
          </button>
        ))}
      </nav>

      <div className="cart-status" onClick={() => navigate("/cart")}>
        <span>🛒</span>
        <strong>{totalItens}</strong>
      </div>

      {menuAberto && (
        <div className="menu-mobile">
          <button onClick={() => { setCategoriaSelecionada(""); setMenuAberto(false); navigate("/"); }}>🏠 Todos os Produtos</button>
          {categorias.map(cat => (
            <button key={cat} onClick={() => { setCategoriaSelecionada(cat); setMenuAberto(false); navigate("/"); }}>
              {iconesCategorias[cat] || "📁"} {cat}
            </button>
          ))}
          <hr style={{ border: "0.5px solid #555", width: "100%" }} />
          <button onClick={() => { navigate("/cart"); setMenuAberto(false); }} style={{ fontWeight: "bold", color: "#00c6ff" }}>
            🛒 Ver Carrinho ({totalItens})
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;