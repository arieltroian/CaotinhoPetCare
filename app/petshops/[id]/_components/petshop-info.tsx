"use client";

import HeaderDesktop from "@/app/_components/header-desktop";
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
  const router = useRouter();
  const handleBackClick = () => {
    router.replace("/");
  };
  return (
    <div>
      <div className="h-[250px] w-full relative lg:hidden">
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
          className="opacity-95"
          sizes="100vw"
        />
      </div>

      <div className="max-lg:hidden">
        <HeaderDesktop />
      </div>
      <div className="lg:pt-6">
        <div className="flex flex-col items-center px-28 pb-6 border-b border-solid border-border">
          <Image
            src={petshop.imageUrl}
            alt={petshop.name}
            width={0}
            height={0}
            style={{
              objectFit: "cover",
            }}
            className="h-[24rem] w-[40rem] rounded-lg max-lg:hidden"
            sizes="100vw"
          />
          <div className="flex flex-col text-left mt-6">
            <h1 className="text-xl font-bold ">{petshop.name}</h1>
            <div className="flex items-center gap-1 mt-2">
              <MapPinIcon className="text-slate-600" size={18} />
              <p className="text-sm text-slate-600">{petshop.address}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetShopInfo;
