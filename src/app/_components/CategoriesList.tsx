import { Badge } from "@/components/ui/badge";
import { BASE_URL } from "@/constants";
import Link from "next/link";

type CategoryType = {
  name: string;
};

const getCategories = async () => {
  const response = await fetch(`${BASE_URL}/categories`);
  const { categories } = await response.json();
  return categories;
};

export const CategoriesList = async () => {
  const categories: CategoryType[] = await getCategories();

  return (
    <div className="flex gap-2">
      {categories.map((category) => (
        <Link key={category._id} href={"/" + category.name}>
          <Badge className="rounded-full text-md" variant="outline">
            {category.name}
          </Badge>
        </Link>
      ))}
    </div>
  );
};
