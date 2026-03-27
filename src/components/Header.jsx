import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

function Header({ setCategoriaSelecionada, categoriaSelecionada }) {
  const [categorias, setCategorias] = useState([]);
  const [menuAberto, setMenuAberto] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/categories")
      .then(res => res.json())
      .then(data => setCategorias(data));
  }, []);

  return (
    <header className="header">
      {/* LOGO */}
      <h2
        className="logo"
        onClick={() => {
          setCategoriaSelecionada("");
          navigate("/");
        }}
      >
        Minha Loja
      </h2>

      {/* MENU DESKTOP */}
      <nav className="menu">
        <button
          className={categoriaSelecionada === "" ? "active" : ""}
          onClick={() => setCategoriaSelecionada("")}
        >
          Todos
        </button>

        {categorias.map(cat => (
          <button
            key={cat}
            className={categoriaSelecionada === cat ? "active" : ""}
            onClick={() => setCategoriaSelecionada(cat)}
          >
            {cat}
          </button>
        ))}
      </nav>

      {/* HAMBURGER */}
      <div
        className="hamburger"
        onClick={() => setMenuAberto(!menuAberto)}
      >
        ☰
      </div>

      {/* MENU MOBILE */}
      {menuAberto && (
        <div className="menu-mobile">
          <button
            onClick={() => {
              setCategoriaSelecionada("");
              setMenuAberto(false);
            }}
          >
            Todos
          </button>

          {categorias.map(cat => (
            <button
              key={cat}
              onClick={() => {
                setCategoriaSelecionada(cat);
                setMenuAberto(false);
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}

export default Header;