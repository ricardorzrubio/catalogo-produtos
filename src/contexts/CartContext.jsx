import { createContext, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  function addToCart(product) {
    const itemExists = cart.find((item) => item.id === product.id);

    if (itemExists) {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  }

  // NOVA LÓGICA: Remove apenas 1 unidade por vez
  function removeFromCart(productId) {
    const itemInCart = cart.find((item) => item.id === productId);

    if (itemInCart.quantity > 1) {
      // Se tem mais de 1, diminui a quantidade
      setCart(
        cart.map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        )
      );
    } else {
      // Se tem apenas 1, remove do array
      setCart(cart.filter((item) => item.id !== productId));
    }
  }

  const totalValue = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, totalValue }}>
      {children}
    </CartContext.Provider>
  );
}