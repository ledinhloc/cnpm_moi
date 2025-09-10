// src/components/Cart/useCart.js
import React, { useContext, createContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([
    {
      id: 1,
      name: "Black Leather Handbag",
      price: 75,
      quantity: 1,
      image: "https://cdn.xtmobile.vn/vnt_upload/product/06_2024/thumbs/(600x600)_crop_Samsung_galaxy_a55_5g_8gb_128gb_cty_mau_tim_xtmobile.png",
    },
    {
      id: 2,
      name: "Running Sneakers",
      price: 120,
      quantity: 2,
      image: "https://cdn.xtmobile.vn/vnt_upload/product/06_2024/thumbs/(600x600)_crop_Samsung_galaxy_a55_5g_8gb_128gb_cty_mau_tim_xtmobile.png",
    },
    {
      id: 3,
      name: "Classic White T-shirt",
      price: 25,
      quantity: 1,
      image: "https://cdn.xtmobile.vn/vnt_upload/product/06_2024/thumbs/(600x600)_crop_Samsung_galaxy_a55_5g_8gb_128gb_cty_mau_tim_xtmobile.png",
    },
    {
      id: 4,
      name: "Stylish Sunglasses",
      price: 45,
      quantity: 1,
      image: "https://cdn.xtmobile.vn/vnt_upload/product/06_2024/thumbs/(600x600)_crop_Samsung_galaxy_a55_5g_8gb_128gb_cty_mau_tim_xtmobile.png",
    },
    {
      id: 5,
      name: "Elegant Wristwatch",
      price: 150,
      quantity: 1,
      image: "https://cdn.xtmobile.vn/vnt_upload/product/06_2024/thumbs/(600x600)_crop_Samsung_galaxy_a55_5g_8gb_128gb_cty_mau_tim_xtmobile.png",
    },
  ]);

  const addItem = (item) => {
    setItems((prev) => {
      const exist = prev.find((i) => i.id === item.id);
      if (exist) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const updateItem = (id, quantity) => {
    setItems((prev) =>
      prev.map((i) =>
        i.id === id
          ? { ...i, quantity: Number.isNaN(quantity) || quantity < 1 ? 1 : quantity }
          : i
      )
    );
  };

  const removeItem = (id) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  return (
    <CartContext.Provider value={{ items, addItem, updateItem, removeItem }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
