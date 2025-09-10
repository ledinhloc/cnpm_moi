import React, { useState } from "react";
import { CartProvider, CartList, useCart, Button, Input } from "./index";

const DemoCart = () => {
  const { addItem } = useCart();
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");

  const handleAddProduct = () => {
    if (!productName || !productPrice) return;
    addItem({
      id: Date.now(),
      name: productName,
      price: parseFloat(productPrice),
    });
    setProductName("");
    setProductPrice("");
  };

  return (
    <div className="max-w-md mx-auto p-4 space-y-3">
      <h1 className="text-2xl font-bold text-center">Demo Giỏ Hàng</h1>

      <div className="flex gap-2">
        <Input
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          placeholder="Tên sản phẩm"
        />
        <Input
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
          placeholder="Giá"
        />
        <Button onClick={handleAddProduct}>Thêm</Button>
      </div>

      <CartList />
    </div>
  );
};

const App = () => {
  return (
    <CartProvider className="cart-app-container">
      <h1 className="cart-title">Your Shopping Cart</h1>
      <DemoCart />
    </CartProvider>
  );
};

export default App;
