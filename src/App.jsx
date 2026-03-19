import { useEffect, useState } from "react";
import Header from "./components/Header";
import ProductCard from "./components/ProductCard";

function App() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProdutos(data));
  }, []);

  return (
    <>
      <Header />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
          padding: "20px",
        }}
      >
        {produtos.map((prod) => (
          <ProductCard key={prod.id} produto={prod} />
        ))}
      </div>
    </>
  );
}

export default App;
