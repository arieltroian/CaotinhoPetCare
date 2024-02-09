"use client";

import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Petshop } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface PetShopItemProps {
  petshop: Petshop;
}

const PetShopItem = ({ petshop }: PetShopItemProps) => {
  // useRouter rota para o id do petshop
  const router = useRouter();
  const handleBookingClick = () => {
    router.push(`/petshops/${petshop.id}`);
  };
  return (
    <Card className="min-w-[167px] max-w-[167px] rounded-2xl">
      <CardContent className="p-0">
        <div className="relative w-full h-[159px]">
          <Image
            src={petshop.imageUrl}
            style={{ objectFit: "cover" }}
            alt={petshop.name}
            fill
            sizes="100vw"
            className="rounded-2xl"
          />
        </div>
        <div className="px-3 pb-3  ">
          <h2 className="font-bold mt-2 overflow-hidden text-ellipsis text-nowrap">
            {petshop.name}
          </h2>
          <p className="text-sm text-gray-400 overflow-hidden text-ellipsis text-nowrap">
            {petshop.address}
          </p>
          <Button
            className="w-full mt-3"
            variant="secondary"
            onClick={handleBookingClick}
          >
            Reservar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PetShopItem;
