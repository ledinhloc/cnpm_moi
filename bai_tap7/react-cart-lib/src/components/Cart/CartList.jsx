import React from "react";
import { useCart } from "./useCart";
import { CartItem } from "./CartItem";

export const CartList = () => {
  const { items, updateItem, removeItem } = useCart();

  return (
    <>
      {items.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          onUpdate={updateItem}
          onRemove={removeItem}
        />
      ))}
    </>
  );
};
