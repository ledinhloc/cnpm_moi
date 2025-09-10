// src/components/Cart/CartList.jsx
import React from "react";
import { useCart } from "./useCart";
import { CartItem } from "./CartItem";

export const CartList = () => {
  const { items, updateItem, removeItem } = useCart();

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          onUpdate={updateItem}
          onRemove={removeItem}
        />
      ))}
    </div>
  );
};
