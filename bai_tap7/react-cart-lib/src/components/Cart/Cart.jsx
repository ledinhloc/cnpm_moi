// src/components/Cart/Cart.jsx
import React from "react";
import { CartList } from "./CartList";
import { useCart } from "./useCart";
import { Button } from "../Button";

export const Cart = () => {
  const { items } = useCart();

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-3 gap-8">
      {/* Left - Cart Items */}
      <div className="md:col-span-2">
        <div className="overflow-x-auto border rounded">
          <table className="w-full text-left">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="p-4">Product</th>
                <th className="p-4">Price</th>
                <th className="p-4">Quantity</th>
                <th className="p-4">Subtotal</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody>
              <CartList />
            </tbody>
          </table>
        </div>

        {/* Coupon + Update */}
        <div className="flex flex-col md:flex-row gap-4 justify-between mt-4">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Coupon code"
              className="border px-3 py-2 rounded"
            />
            <Button variant="primary">APPLY COUPON</Button>
          </div>
          <Button variant="secondary">UPDATE CART</Button>
        </div>
      </div>

      {/* Right - Cart Totals */}
      <div className="border rounded p-6 bg-white h-fit">
        <h2 className="text-lg font-semibold mb-4">Cart totals</h2>
        <div className="flex justify-between border-b py-2">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between py-2">
          <span>Total</span>
          <span className="font-bold">${subtotal.toFixed(2)}</span>
        </div>
        <Button variant="primary" className="w-full mt-4">
          PROCEED TO CHECKOUT
        </Button>
      </div>
    </div>
  );
};
