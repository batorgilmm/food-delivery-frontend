import type { Metadata } from "next";
import "../globals.css";
import { Header } from "./_components/Header";

export const metadata: Metadata = {
  title: "Food delivery",
  description: "Pinecone",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
      <Header />
      {children}
    </section>
  );
}
