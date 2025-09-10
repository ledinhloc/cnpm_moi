// src/components/Cart/CartItem.jsx
import React from "react";
import { Button, Input, Card } from "../";

export const CartItem = ({ item, onUpdate, onRemove }) => (
  <Card>
    <div className="flex justify-between items-center">
      <div>
        <h3 className="font-bold">{item.name}</h3>
        <p>${item.price}</p>
      </div>
      <div className="flex gap-2">
        <Input
          value={item.quantity}
          onChange={(e) => onUpdate(item.id, parseInt(e.target.value))}
        />
        <Button variant="secondary" onClick={() => onRemove(item.id)}>
          Xóa
        </Button>
      </div>
    </div>
  </Card>
);
