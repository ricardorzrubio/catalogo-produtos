import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../hooks/useCart"; // Novo Hook personalizado
import { getProductById } from "../services/api"; // Service
import "../styles/pages/ProductDetail.css";

function ProductDetail() {
  const { id } = useParams();
  const [produto, setProduto] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Abstração do contexto
  const { addToCart } = useCart();

  useEffect(() => {
    // Busca isolada no service
    getProductById(id)
      .then(data => {
        setProduto(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="loading">Carregando detalhes...</p>;
  if (!produto) return <p className="loading">Produto não encontrado.</p>;

  return (
    <div className="container product-detail-container">
      <div className="product-detail-card">
        <img 
          src={produto.image} 
          alt={produto.title} 
          className="product-detail-image" 
        />
        
        <div className="product-detail-info">
          <h1 className="product-detail-title">{produto.title}</h1>
          <p className="product-detail-description">{produto.description}</p>
          
          <h2 className="product-detail-price">
            {produto.price.toLocaleString("pt-BR", { 
              style: "currency", 
              currency: "BRL" 
            })}
          </h2>

          <button className="btn-adicionar" onClick={() => addToCart(produto)}>
            <span>🛒</span> Adicionar ao Carrinho
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;