import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";

function ProductDetail() {
  const { id } = useParams();
  const [produto, setProduto] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Consumindo a função de Adicionar do Estado Global
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduto(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  // Feedback de carregamento conforme requisitos
  if (loading) return <p className="loading">Carregando detalhes...</p>;
  if (!produto) return <p>Produto não encontrado.</p>;

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <div style={{ 
        display: 'flex', 
        gap: '40px', 
        justifyContent: 'center', 
        alignItems: 'center', 
        flexWrap: 'wrap' 
      }}>
        <img src={produto.image} width="300" alt={produto.title} style={{ objectFit: 'contain' }} />
        
        <div style={{ maxWidth: "500px", textAlign: "left" }}>
          <h1>{produto.title}</h1>
          <p style={{ fontSize: "16px", lineHeight: "1.6", color: "#555" }}>
            {produto.description}
          </p>
          
          <h2 style={{ color: "green", margin: "20px 0" }}>
            {produto.price.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </h2>

          {/* Botão estilizado com classe do App.css  */}
          <button 
            className="btn-adicionar" 
            onClick={() => addToCart(produto)}
          >
            <span>🛒</span> Adicionar ao Carrinho
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;