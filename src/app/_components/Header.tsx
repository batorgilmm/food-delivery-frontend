import { useCart } from "@/providers/CartProvider";
import React from "react";

const Header = () => {
  const { setOpen } = useCart();
  return (
    <header>
      <button onClick={() => setOpen(true)}>Cart</button>
    </header>
  );
};

export default Header;
