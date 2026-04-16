import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
import "./Header.css";

function Header({ setCategoriaSelecionada, categoriaSelecionada }) {
  const [categorias, setCategorias] = useState([]);
  const [menuAberto, setMenuAberto] = useState(false);
  
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();
  const totalItens = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Lógica para fechar o menu automaticamente se a tela aumentar
  useEffect(() => {
    function tratarRedimensionamento() {
      if (window.innerWidth > 1024) {
        setMenuAberto(false);
      }
    }

    window.addEventListener("resize", tratarRedimensionamento);
    
    // Limpeza do evento ao desmontar o componente
    return () => window.removeEventListener("resize", tratarRedimensionamento);
  }, []);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/categories")
      .then(res => res.json())
      .then(data => setCategorias(data))
      .catch(err => console.error("Erro ao carregar categorias", err));
  }, []);

  return (
    <header className="header">
      {/* 1. HAMBÚRGUER */}
      <div className="hamburger" onClick={() => setMenuAberto(!menuAberto)}>
        ☰
      </div>

      {/* 2. LOGO */}
      <h2
        className="logo"
        onClick={() => {
          setCategoriaSelecionada("");
          navigate("/");
        }}
      >
        Minha Loja
      </h2>

      {/* 3. MENU DESKTOP */}
      <nav className="menu">
        <button
          className={categoriaSelecionada === "" ? "active" : ""}
          onClick={() => {
            setCategoriaSelecionada("");
            navigate("/");
          }}
        >
          Todos
        </button>

        {categorias.map(cat => (
          <button
            key={cat}
            className={categoriaSelecionada === cat ? "active" : ""}
            onClick={() => {
              setCategoriaSelecionada(cat);
              navigate("/");
            }}
          >
            {cat}
          </button>
        ))}
      </nav>

      {/* 4. CARRINHO */}
      <div className="cart-status" onClick={() => navigate("/cart")}>
        <span>🛒</span>
        <strong>{totalItens}</strong>
      </div>

      {/* MENU MOBILE SUSPENSO */}
      {menuAberto && (
        <div className="menu-mobile">
          <button
            onClick={() => {
              setCategoriaSelecionada("");
              setMenuAberto(false);
              navigate("/");
            }}
          >
            🏠 Todos os Produtos
          </button>

          {categorias.map(cat => (
            <button
              key={cat}
              onClick={() => {
                setCategoriaSelecionada(cat);
                setMenuAberto(false);
                navigate("/");
              }}
            >
              📁 {cat}
            </button>
          ))}
          
          <hr style={{ border: "0.5px solid #555", width: "100%" }} />
          
          <button 
            onClick={() => { 
              navigate("/cart"); 
              setMenuAberto(false); 
            }}
            style={{ fontWeight: "bold", color: "#00c6ff" }}
          >
            🛒 Ver Carrinho ({totalItens})
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;