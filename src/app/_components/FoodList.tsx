"use client";

import { Card } from "@/components/ui/card";
import { BASE_URL } from "@/constants";
import Image from "next/image";
import { useEffect, useState } from "react";
import FoodModal from "./FoodModal";

type FoodType = {
  _id: string;
  name: string;
  price: number;
  image: string;
  ingredients: string[];
};

type CategoryType = {
  _id: string;
  name: string;
  foods: FoodType[];
  createdAt: string;
  updatedAt: string;
};

const FoodList = () => {
  const [categories, setCategories] = useState([]);

  const getFoods = async () => {
    const response = await fetch(`${BASE_URL}/categories/with-foods`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const { categories } = await response.json();

    setCategories(categories);
  };

  useEffect(() => {
    getFoods();
  }, []);

  return (
    <div>
      {categories.map((category: CategoryType) => {
        return (
          <div key={category._id}>
            <p className="font-bold mt-4">{category.name}</p>
            <div className="grid grid-cols-3 gap-4 mt-4">
              {category.foods.map((food) => (
                <Card
                  key={food._id}
                  className="w-fit p-4 shadow-none flex gap-8"
                >
                  <div className="relative">
                    <Image
                      src={
                        food.image ||
                        "https://s3-alpha-sig.figma.com/img/4ff5/1a14/c041fc57196ebf52f07e524b5e4cc98c?Expires=1745193600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Tb2WmaNFwFmE9xQo~g7nPHbBZuBcRQaQJT1maZWTWybU9mpn-pRTbuGjH~KrmJmWBV2Xwx-vw1-kEfE~pEDLAR9m4YtPw4893a0Ka6tMrO-KMy5TLhmpljGEpf2kp6yMGNsYoh2O6nnAdepimMHrbnLZ3Vnv~VEs1Nk-uVFpiWSTXLp3qpzkOdv3q2Mc6nYO1PUWXunJRxhNXeOeof8iGPLVxMsu-O~K-bu9ynZlJTu2MMac4s8Yf53IhYeBQ6LhHtNE-l0yze610i12jlBr6scTfdMbxbFcSx5cZ1D51SBHNiaDq5kr0vLKW-HurA0uW1hop9MrUr4R6v7G0tcdOg__"
                      }
                      alt="food"
                      width={377}
                      height={364}
                    />
                    <FoodModal food={food} />
                  </div>
                  <div className="flex justify-between">
                    <p>{food.name}</p>
                    <p>{food.price}</p>
                  </div>
                  <p>{food.ingredients.map((i) => i)}</p>
                </Card>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FoodList;
