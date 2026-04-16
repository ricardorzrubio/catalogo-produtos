# 🛒 SwiftShop - E-commerce com React

Projeto desenvolvido para o desafio final do curso **Desenvolve (Itabira - 2026)**. O objetivo é criar um catálogo de produtos funcional consumindo a Fake Store API.

## 🚀 Funcionalidades
- **Navegação**: Filtro por categorias e navegação entre páginas com React Router.
- **Carrinho**: Adicionar, remover e ajustar quantidades de produtos.
- **Estado Global**: Gerenciamento de estado complexo com Context API.
- **Persistência**: Dados do carrinho salvos no `localStorage` (não perde ao atualizar).
- **Interface Responsiva**: Menu hambúrguer adaptado para dispositivos móveis.
- **Feedback**: Estados de carregamento (Loading) e tratamento de erros.

## 🛠️ Tecnologias
- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [React Router](https://reactrouter.com/)
- [CSS3](https://developer.mozilla.org/pt-BR/docs/Web/CSS) (Componentização de estilos)

## 📁 Organização do Projeto
```text
src/
 ├── components/  # Componentes reutilizáveis (Cards, Header)
 ├── contexts/    # Gerenciamento de estado global
 ├── hooks/       # Hooks personalizados
 ├── pages/       # Páginas principais (Home, Cart, Detail)
 ├── services/    # Comunicação com a API
 └── styles/      # Arquivos de estilo separados por componente
