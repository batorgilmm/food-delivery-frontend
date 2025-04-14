import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BASE_URL } from "@/constants";
import { Plus } from "lucide-react";
import Image from "next/image";

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
                  <div className="w-[365px] h-[210px] relative">
                    <Dialog>
                      <DialogTrigger
                        className="absolute bottom-5 right-8 z-10"
                        asChild
                      >
                        <Button
                          size="icon"
                          className="rounded-full bg-white cursor-pointer"
                        >
                          <Plus color="red" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Are you absolutely sure?</DialogTitle>
                          <DialogDescription>
                            This action cannot be undone. This will permanently
                            delete your account and remove your data from our
                            servers.
                          </DialogDescription>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                    <Image
                      src={
                        food.image || "https://s3-alpha-sig.figma.com/img/4ff5/1a14/c041fc57196ebf52f07e524b5e4cc98c?Expires=1745193600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Tb2WmaNFwFmE9xQo~g7nPHbBZuBcRQaQJT1maZWTWybU9mpn-pRTbuGjH~KrmJmWBV2Xwx-vw1-kEfE~pEDLAR9m4YtPw4893a0Ka6tMrO-KMy5TLhmpljGEpf2kp6yMGNsYoh2O6nnAdepimMHrbnLZ3Vnv~VEs1Nk-uVFpiWSTXLp3qpzkOdv3q2Mc6nYO1PUWXunJRxhNXeOeof8iGPLVxMsu-O~K-bu9ynZlJTu2MMac4s8Yf53IhYeBQ6LhHtNE-l0yze610i12jlBr6scTfdMbxbFcSx5cZ1D51SBHNiaDq5kr0vLKW-HurA0uW1hop9MrUr4R6v7G0tcdOg__"
                      }
                      alt="food"
                      objectFit="cover"
                      layout="fill"
                    />
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
