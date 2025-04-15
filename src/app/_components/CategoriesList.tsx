"use client";
import { Badge } from "@/components/ui/badge";
import { BASE_URL } from "@/constants";
import Link from "next/link";
import { useEffect, useState } from "react";

type CategoryType = {
  _id: string;
  name: string;
};

const getCategories = async () => {
  const response = await fetch(`${BASE_URL}/categories`);
  const { categories } = await response.json();
  return categories;
};

export const CategoriesList = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="flex gap-2">
      {categories.map((category: CategoryType) => (
        <Link key={category._id} href={"/" + category.name}>
          <Badge className="rounded-full text-md" variant="outline">
            {category.name}
          </Badge>
        </Link>
      ))}
    </div>
  );
};
