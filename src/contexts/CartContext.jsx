import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  // Tenta carregar o carrinho do localStorage ao iniciar
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("carrinho_loja");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Sempre que o 'cart' mudar, salva no localStorage
  useEffect(() => {
    localStorage.setItem("carrinho_loja", JSON.stringify(cart));
  }, [cart]);

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