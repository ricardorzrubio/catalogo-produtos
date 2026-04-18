import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import "../styles/pages/Cart.css";

function Cart() {
  const { cart, addToCart, removeFromCart, removeItemCompletely, clearCart, finalizePurchase, totalValue } = useCart();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleFinalizarCompra = () => {
    if (cart.length > 0) {
      setShowModal(true);
    }
  };

  const confirmarSucesso = () => {
    setShowModal(false);
    finalizePurchase();
  };

  return (
    <div className="container cart-page-container">
      <div className="cart-header-actions">
         <button className="btn-voltar" onClick={() => navigate("/")}>← Continuar Comprando</button>
         <h1>Seu Carrinho</h1>
      </div>

      {cart.length === 0 ? (
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <p>O carrinho está vazio.</p>
          <button className="btn-historico" style={{marginTop: '20px'}} onClick={() => navigate("/history")}>Ver Histórico de Compras</button>
        </div>
      ) : (
        <div className="cart-wrapper">
          <div className="cart-list-container">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} width="80" height="80" alt={item.title} className="cart-item-img" />
                <div className="cart-item-info">
                  <p className="cart-item-title">{item.title}</p>
                  <div className="cart-controls">
                    <div className="quantidade-container">
                      <button className="btn-quantidade btn-menos" onClick={() => removeFromCart(item.id)}>−</button>
                      <span className="quantidade-numero">{item.quantity}</span>
                      <button className="btn-quantidade" onClick={() => addToCart(item)}>+</button>
                    </div>
                    <button className="btn-remover-tudo" title="Remover item" onClick={() => removeItemCompletely(item.id)}>🗑️</button>
                  </div>
                </div>
                <div className="cart-item-price">
                  <p>{(item.price * item.quantity).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="cart-footer">
            <h2 className="total-label">
              Total Checkout: <span className="total-highlight">{totalValue.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</span>
            </h2>
            
            <div className="cart-actions-row">
              <button className="btn-historico" onClick={() => navigate("/history")}>📜 Ver Histórico</button>
              
              <div className="cart-buttons-right">
                <button className="btn-limpar" onClick={clearCart}>Limpar Carrinho</button>
                <button className="btn-finalizar" onClick={handleFinalizarCompra}>Finalizar Compra</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-icon">✅</div>
            <h2>Compra realizada com sucesso!</h2>
            <p>Seu pedido foi processado e salvo no seu histórico.</p>
            <button className="btn-modal-ok" onClick={confirmarSucesso}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;