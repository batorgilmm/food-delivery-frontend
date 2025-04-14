import { CategoriesList } from "./_components/CategoriesList";
import FoodList from "./_components/FoodList";

export default function Home() {
  console.log("main stack");

  console.log('sub pr 1')
  return (
    <div className="mx-10 mt-10">
      <CategoriesList />
      <FoodList />
    </div>
  );
}
