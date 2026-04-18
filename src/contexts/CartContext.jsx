import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("carrinho_loja");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Novo estado para o histórico
  const [history, setHistory] = useState(() => {
    const savedHistory = localStorage.getItem("historico_vendas");
    return savedHistory ? JSON.parse(savedHistory) : [];
  });

  useEffect(() => {
    localStorage.setItem("carrinho_loja", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("historico_vendas", JSON.stringify(history));
  }, [history]);

  function addToCart(product) {
    const itemExists = cart.find((item) => item.id === product.id);
    if (itemExists) {
      setCart(cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  }

  function removeFromCart(productId) {
    const itemInCart = cart.find((item) => item.id === productId);
    if (itemInCart && itemInCart.quantity > 1) {
      setCart(cart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
      ));
    } else {
      removeItemCompletely(productId);
    }
  }

  function removeItemCompletely(productId) {
    setCart(cart.filter((item) => item.id !== productId));
  }

  function clearCart() {
    setCart([]);
  }

  // Função para finalizar a compra e gerar o registro no histórico
  function finalizePurchase() {
    const newOrder = {
      id: Date.now(),
      date: new Date().toLocaleString("pt-BR"),
      items: [...cart],
      total: totalValue
    };
    setHistory([newOrder, ...history]); // Adiciona no topo do histórico
    clearCart();
  }

  const totalValue = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ 
      cart, 
      history,
      addToCart, 
      removeFromCart, 
      removeItemCompletely, 
      clearCart, 
      finalizePurchase,
      totalValue 
    }}>
      {children}
    </CartContext.Provider>
  );
}