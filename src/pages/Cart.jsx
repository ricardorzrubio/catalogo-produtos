import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";

function Cart() {
  const { cart, addToCart, removeFromCart, totalValue } = useContext(CartContext);

  return (
    <div className="container" style={{ maxWidth: "800px", margin: "0 auto" }}>
      <h1>Seu Carrinho</h1>
      {cart.length === 0 ? (
        <p>O carrinho está vazio.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item.id} style={{ 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "space-between", 
              borderBottom: "1px solid #ddd", 
              padding: "20px 10px" 
            }}>
              <img src={item.image} width="60" alt={item.title} style={{ objectFit: "contain" }} />
              
              <div style={{ flex: 1, padding: "0 20px", textAlign: "left" }}>
                <p style={{ fontWeight: "bold", margin: "0 0 10px 0" }}>{item.title}</p>
                
                {/* CONTROLLER DE QUANTIDADE */}
                <div className="quantidade-container" style={{ width: "fit-content" }}>
                  <button className="btn-quantidade" onClick={() => removeFromCart(item.id)}>-</button>
                  <span className="quantidade-numero">{item.quantity}</span>
                  <button className="btn-quantidade" onClick={() => addToCart(item)}>+</button>
                </div>
              </div>

              <div style={{ textAlign: "right" }}>
                <p style={{ fontWeight: "bold", fontSize: "18px" }}>
                  {(item.price * item.quantity).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                </p>
              </div>
            </div>
          ))}
          
          {/* TOTAL CHECKOUT */}
          <h2 style={{ textAlign: "right", marginTop: "30px", borderTop: "2px solid #222", paddingTop: "20px" }}>
            Total Checkout: {totalValue.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
          </h2>
        </div>
      )}
    </div>
  );
}

export default Cart;