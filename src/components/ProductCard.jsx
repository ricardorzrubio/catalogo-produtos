import "./ProductCard.css";
import { useNavigate } from "react-router-dom";

function ProductCard({ produto }) {
  const navigate = useNavigate();

  return (
    <div
      className="card"
      onClick={() => navigate(`/product/${produto.id}`)}
    >
      <img src={produto.image} alt={produto.title} />

      <h3>{produto.title}</h3>

      <p className="price">
        {produto.price.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}
      </p>
    </div>
  );
}

export default ProductCard;