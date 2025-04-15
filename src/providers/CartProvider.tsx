"use client";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

import { Sheet, SheetContent } from "@/components/ui/sheet";
import Image from "next/image";

export type FoodType = {
  _id: string;
  name: string;
  price: number | string;
  ingredients: string | string[];
  image: string;
};

type ItemType = {
  food: FoodType;
  count: number;
};

type ContextType = {
  item: ItemType[];
  totalAmount?: number;
  addItem: (value: ItemType) => void;
  removeItem?: (id: string) => void;
  setOpen: (open: boolean) => void;
};

const CartContext = createContext<ContextType>({
  item: [],
  totalAmount: 0,
  addItem: (_item: any) => {},
  removeItem: (_id: string) => {},
  setOpen: (_open: boolean) => {},
});

const CartProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const getLocalStorage =
    typeof window !== "undefined" && localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart") as string)
      : [];
  const [item, setItem] = useState<ItemType[]>(getLocalStorage);
  const [open, setOpen] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);

  const addItem = (value: ItemType) => {
    setOpen(true);

    const index = item.findIndex((i) => i.food._id == value.food._id);

    if (index != -1) {
      const cloneArray = [...item];

      cloneArray[index].count += value.count;

      setItem(cloneArray);
      return;
    }

    setItem((prev) => [...prev, value]);
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(item));

    const eachFoodsTotal = item.map((i) => {
      return i.count * Number(i.food.price);
    });

    const total = eachFoodsTotal.reduce((acc, curr) => acc + curr, 0);

    setTotalAmount(total);
  }, [item]);

  return (
    <CartContext.Provider value={{ item, addItem, setOpen }}>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="p-4 flex flex-col justify-between">
          <div>
            {item.map(({ food, count }) => (
              <div>
                <Image
                  width={124}
                  height={120}
                  src={food.image}
                  alt={food.name}
                />
                <div>
                  <p>{food.name}</p>
                  <p>{food.ingredients}</p>

                  <div className="flex justify-between mt-8">
                    <p>{count}</p>
                    <p>{count * Number(food.price)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div>Total amount: {totalAmount}</div>
        </SheetContent>
      </Sheet>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

export const useCart = () => {
  return useContext(CartContext);
};
