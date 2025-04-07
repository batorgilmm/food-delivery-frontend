import { BASE_URL } from "@/constants";

type FoodType = {
  _id: string;
  name: string;
  price: number;
  ingredients: string[];
};

type CategoryType = {
  _id: string;
  name: string;
  foods: FoodType[];
  createdAt: string;
  updatedAt: string;
};

const FoodList = async () => {
  const response = await fetch(`${BASE_URL}/categories/with-foods`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const { categories } = await response.json();

  console.log(categories);

  return (
    <div>
      {categories.map((category: CategoryType) => {
        return (
          <div key={category._id}>
            <p className="font-bold mt-4">{category.name}</p>
            <div>
              {category.foods.map((food) => (
                <div key={food._id}>
                  <p>{food.name}</p>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FoodList;
