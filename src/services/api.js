const BASE_URL = "https://fakestoreapi.com";

export const getProducts = async () => {
  const res = await fetch(`${BASE_URL}/products`);
  if (!res.ok) throw new Error("Erro ao buscar produtos");
  return res.json();
};

export const getProductById = async (id) => {
  const res = await fetch(`${BASE_URL}/products/${id}`);
  if (!res.ok) throw new Error("Erro ao carregar detalhes");
  return res.json();
};

export const getCategories = async () => {
  const res = await fetch(`${BASE_URL}/products/categories`);
  return res.json();
};