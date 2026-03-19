function ProductCard({ produto }) {
  return (
    <div style={{ border: "1px solid #ccc", padding: "10px" }}>
        <img src={produto.image} width="100" />
        <h3>{produto.title}</h3>
        <p>
            {produto.price.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
            })}
        </p>
    </div>
  );
}

export default ProductCard;