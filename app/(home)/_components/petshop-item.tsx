"use client";

import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Petshop } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
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
    <Card className="min-w-[200px] max-w-[200px] rounded-2xl hover:bg-white hover:shadow-xl">
      <Link href={`/petshops/${petshop.id}`}>
        <CardContent className="p-0">
          <div className="relative w-full h-[160px]">
            <Image
              src={petshop.imageUrl}
              style={{ objectFit: "cover" }}
              alt={petshop.name}
              fill
              sizes="100vw"
              className="rounded-t-xl"
            />
          </div>
          <div className="px-4 pb-4">
            <h2 className="font-bold mt-3 overflow-hidden text-ellipsis text-nowrap">
              {petshop.name}
            </h2>
            <p className="text-sm text-gray-600 overflow-hidden text-ellipsis text-nowrap">
              {petshop.address}
            </p>
            <Button className="w-full mt-4" variant="secondary">
              Reservar
            </Button>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};

export default PetShopItem;
