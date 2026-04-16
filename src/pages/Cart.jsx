import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import "../styles/pages/Cart.css";

function Cart() {
  const { cart, addToCart, removeFromCart, totalValue } = useContext(CartContext);

  return (
    <div className="container" style={{ maxWidth: "900px", margin: "0 auto" }}>
      <h1>Carrinho</h1>
      {cart.length === 0 ? (
        <p style={{textAlign: 'center'}}>O carrinho está vazio.</p>
      ) : (
        <div style={{ backgroundColor: "white", borderRadius: "10px", padding: "10px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
          {cart.map((item) => (
            <div key={item.id} style={{ 
              display: "flex", 
              alignItems: "center", 
              borderBottom: "1px solid #eee", 
              padding: "20px" 
            }}>
              <img src={item.image} width="80" height="80" alt={item.title} style={{ objectFit: "contain" }} />
              
              <div style={{ flex: 1, padding: "0 25px", textAlign: "left" }}>
                <p style={{ fontWeight: "bold", fontSize: "18px", margin: "0 0 10px 0" }}>{item.title}</p>
                
                <div className="quantidade-container">
                  <button className="btn-quantidade" onClick={() => removeFromCart(item.id)}>−</button>
                  <span className="quantidade-numero">{item.quantity}</span>
                  <button className="btn-quantidade" onClick={() => addToCart(item)}>+</button>
                </div>
              </div>

              <div style={{ textAlign: "right" }}>
                <p style={{ fontWeight: "bold", fontSize: "20px", color: "#28a745" }}>
                  {(item.price * item.quantity).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                </p>
              </div>
            </div>
          ))}
          
          <div style={{ padding: "20px", textAlign: "right" }}>
            <h2 style={{ fontSize: "24px" }}>
              Total Checkout: {totalValue.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
            </h2>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;