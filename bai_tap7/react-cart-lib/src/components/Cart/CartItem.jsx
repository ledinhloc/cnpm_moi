// src/components/Cart/CartItem.jsx
import React from "react";
import { Button } from "../Button";
import { Input } from "../Input";

export const CartItem = ({ item, onUpdate, onRemove }) => (
  <tr className="border-b">
    <td className="p-4 flex items-center gap-3">
      <img
        src={item.image || "https://via.placeholder.com/60"}
        alt={item.name}
        className="w-16 h-16 object-cover border rounded"
      />
      <span className="font-medium">{item.name}</span>
    </td>
    <td className="p-4">${item.price.toFixed(2)}</td>
    <td className="p-4">
      <Input
        type="number"
        value={item.quantity}
        onChange={(e) => onUpdate(item.id, parseInt(e.target.value))}
        className="w-20 text-center"
      />
    </td>
    <td className="p-4">${(item.price * item.quantity).toFixed(2)}</td>
    <td className="p-4">
      <Button variant="secondary" onClick={() => onRemove(item.id)}>
        ✕
      </Button>
    </td>
  </tr>
);
