import { CategoriesList } from "./_components/CategoriesList";
import FoodList from "./_components/FoodList";

export default function Home() {

  console.log('1 stacked head pr')
  return (
    <div className="mx-10 mt-10">
      <CategoriesList />
      <FoodList />
    </div>
  );
}
