"use client";

import SideMenu from "@/app/_components/side-menu";
import { Button } from "@/app/_components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/app/_components/ui/sheet";
import { Petshop } from "@prisma/client";
import { ChevronLeftIcon, MapPinIcon, MenuIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface PetshopInfoProps {
  petshop: Petshop;
}

const PetShopInfo = ({ petshop }: PetshopInfoProps) => {
  const route = useRouter();
  const handleBackClick = () => {
    route.back();
  };
  return (
    <div>
      <div className="h-[250px] w-full relative">
        <Button
          onClick={handleBackClick}
          size="icon"
          variant="outline"
          className="z-50 top-4 left-4 absolute"
        >
          <ChevronLeftIcon />
        </Button>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              className="z-50 absolute top-4 right-4"
              variant="outline"
              size="icon"
            >
              <MenuIcon size={18} />
            </Button>
          </SheetTrigger>

          <SheetContent className="p-0">
            <SideMenu />
          </SheetContent>
        </Sheet>

        <Image
          src={petshop.imageUrl}
          fill
          alt={petshop.name}
          style={{
            objectFit: "cover",
          }}
          className="opacity-75"
        />
      </div>

      <div className="px-5 pt-3 pb-6 border-b border-solid border-secondary">
        <h1 className="text-xl font-bold ">{petshop.name}</h1>

        <div className="flex items-center gap-1 mt-2">
          <MapPinIcon className="text-primary" size={18} />
          <p className="text-sm">{petshop.address}</p>
        </div>
      </div>
    </div>
  );
};

export default PetShopInfo;
