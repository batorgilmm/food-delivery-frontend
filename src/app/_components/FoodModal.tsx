import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { FoodType, useCart } from "@/providers/CartProvider";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

const FoodModal = ({ food }: { food: FoodType }) => {
  const [counter, setCounter] = useState(1);
  const [totalPrice, setTotalPrice] = useState(Number(food.price));

  const { addItem } = useCart();

  const add = () => {
    setCounter((prev) => prev + 1);

    setTotalPrice((_prev) => Number(food.price) * (counter + 1));
  };

  const minus = () => {
    setCounter((prev) => prev - 1);

    setTotalPrice((prev) => prev - Number(food.price));
  };

  const addCart = () => {
    addItem({
      food,
      count: counter,
    });
  };
  return (
    <Dialog>
      <DialogTrigger className="absolute bottom-5 right-8 z-20" asChild>
        <Button size="icon" className="rounded-full bg-white cursor-pointer">
          <Plus color="red" />
        </Button>
      </DialogTrigger>
      <DialogContent className="grid grid-cols-2 gap-4 p-4">
        <div>
          <Image width={377} height={364} src={food.image} alt="food_image" />
        </div>
        <div className="flex flex-col justify-between">
          <div>
            <h1>{food.name}</h1>
            <p>{food.ingredients}</p>
          </div>

          <div>
            <div className="flex justify-between items-center">
              <div>
                <p>{totalPrice}$</p>
              </div>

              <div className="flex items-center space-x-2">
                <Button disabled={counter == 0} onClick={minus} size="icon">
                  <Minus />
                </Button>
                <p>{counter}</p>
                <Button onClick={add} size="icon">
                  <Plus />
                </Button>
              </div>
            </div>
            <Button onClick={addCart} className="w-full mt-4">
              Add to cart
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FoodModal;
