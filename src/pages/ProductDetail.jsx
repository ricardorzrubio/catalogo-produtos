import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ProductDetail() {
  const { id } = useParams();
  const [produto, setProduto] = useState(null);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => res.json())
      .then(data => setProduto(data));
  }, [id]);

  if (!produto) return <p>Carregando...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>{produto.title}</h1>
      <img src={produto.image} width="200" />
      <p>{produto.description}</p>
      <h2>
        {produto.price.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}
      </h2>
    </div>
  );
}

export default ProductDetail;