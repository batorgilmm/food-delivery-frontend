"use client";

import CartProvider from "@/providers/CartProvider";
import Header from "../_components/Header";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <CartProvider>
        <Header />
        {children}
      </CartProvider>
    </section>
  );
}
