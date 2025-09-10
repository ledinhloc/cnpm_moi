// src/components/Cart/CartItem.jsx
import React from "react";
import { Button } from "../Button";
import { Input } from "../Input";

export const CartItem = ({ item, onUpdate, onRemove }) => {
  const handleChange = (e) => {
    const value = parseInt(e.target.value);
    if (isNaN(value) || value < 1) {
      onUpdate(item.id, 1);
    } else {
      onUpdate(item.id, value);
    }
  };

  return (
    <tr className="border-b">
      <td className="p-4 flex items-center gap-3">
        <img
          src={item.image}
          alt={item.name}
          className="w-20 h-20 object-cover rounded-md"
        />
        <span className="font-medium">{item.name}</span>
      </td>
      <td className="p-16">${item.price.toFixed(2)}</td>
      <td className="p-4">
        <div className="flex items-center gap-2">
          {/* <Button variant="secondary" onClick={() => onUpdate(item.id, item.quantity - 1)}>
            -
          </Button> */}
          <Input
            type="number"
            value={item.quantity}
            onChange={handleChange}
            className="w-20 text-center"
          />
          {/* <Button variant="secondary" onClick={() => onUpdate(item.id, item.quantity + 1)}>
            +
          </Button> */}
        </div>
      </td>
      <td className="p-4">${(item.price * item.quantity).toFixed(2)}</td>
      <td className="p-4">
        <Button variant="danger" onClick={() => onRemove(item.id)}>
          ✕
        </Button>
      </td>
    </tr>
  );
};
