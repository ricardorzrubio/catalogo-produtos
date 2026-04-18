import { useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import "../styles/pages/History.css";

function History() {
  const { history } = useCart();
  const navigate = useNavigate();

  return (
    <div className="container history-page-container">
      <div className="history-header">
        <button className="btn-voltar" onClick={() => navigate("/cart")}>← Voltar para o Carrinho</button>
        <h1>📜 Histórico de Compras</h1>
      </div>

      {history.length === 0 ? (
        <p style={{ textAlign: "center", marginTop: "50px" }}>Você ainda não realizou compras.</p>
      ) : (
        <div className="history-list">
          {history.map((order) => (
            <div key={order.id} className="history-card">
              <div className="history-card-header">
                <span className="order-date">📅 {order.date}</span>
                <span className="order-total">Total: {order.total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</span>
              </div>
              <div className="history-items">
                {order.items.map((item) => (
                  <div key={item.id} className="history-item-row">
                    <img src={item.image} alt={item.title} className="history-item-thumb" />
                    <span className="history-item-name">{item.title}</span>
                    <span className="history-item-qty">{item.quantity}x</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default History;