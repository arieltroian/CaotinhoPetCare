"use client";

import { Prisma } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { format, isPast } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import Image from "next/image";
import { Button } from "./ui/button";
import { cancelBooking } from "../_actions/cancel-booking";
import { toast } from "sonner";
import { useState } from "react";
import { Loader2 } from "lucide-react";

interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: true;
      petshop: true;
    };
  }>;
}

const BookingItem = ({ booking }: BookingItemProps) => {
  const [isDeleteLoading, setIsDeleteLoaging] = useState(false);
  const isBookingConfirmed = isPast(booking.date);

  const handleCancelClick = async () => {
    setIsDeleteLoaging(true);
    try {
      await cancelBooking(booking.id);

      toast.success("Reserva cancelada com sucesso!");
    } catch (error) {
      console.log(error);
    } finally {
      setIsDeleteLoaging(false);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Card className="min-w-[70%]">
          <CardContent className="px-0 py-0 flex">
            <div className="flex flex-col flex-[3] gap-2 py-5 pl-5">
              <Badge
                variant={isBookingConfirmed ? "secondary" : "default"}
                className="w-fit my-3"
              >
                {isBookingConfirmed ? "Finalizado" : "Confirmado"}
              </Badge>
              <h2 className="font-bold">{booking.service.name}</h2>

              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={booking.petshop.imageUrl} sizes="100vw" />
                  <AvatarFallback>A</AvatarFallback>
                </Avatar>
                <h3 className="text-sm">{booking.petshop.name}</h3>
              </div>
            </div>

            <div className=" flex flex-col flex-1 items-center justify-center border-l border-solid border-input">
              <p className="text-sm capitalize">
                {format(booking.date, "MMMM", {
                  locale: ptBR,
                })}
              </p>
              <p className="text-2xl">{format(booking.date, "dd")}</p>
              <p className="text-sm">{format(booking.date, "hh:mm")}</p>
            </div>
          </CardContent>
        </Card>
      </SheetTrigger>

      <SheetContent className="px-0">
        <SheetHeader className="text-left pb-6 px-5 border-b border-solid border-secondary">
          <SheetTitle>Informações da Reserva</SheetTitle>
        </SheetHeader>

        <div className="px-5">
          <div className="relative h-[180px] w-full mt-6">
            <Image
              src="/petshop-map.png"
              alt={booking.petshop.name}
              className="rounded-xl"
              fill
            />
            <div className="w-full absolute bottom-4 left-0 px-5">
              <Card>
                <CardContent className="flex gap-2 p-3">
                  <Avatar>
                    <AvatarImage src={booking.petshop.imageUrl} />
                  </Avatar>
                  <div>
                    <h2 className="font-bold">{booking.petshop.name}</h2>
                    <h3 className="text-xs overflow-hidden text-nowrap text-ellipsis">
                      {booking.petshop.address}
                    </h3>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <Badge
            variant={isBookingConfirmed ? "secondary" : "default"}
            className="w-fit mt-3 mb-6"
          >
            {isBookingConfirmed ? "Finalizado" : "Confirmado"}
          </Badge>
          <Card>
            <CardContent className="flex flex-col gap-3 p-3">
              <div className="flex justify-between">
                <h2 className="font-bold">{booking.service.name}</h2>
                <h3 className="font-bold text-sm">
                  {Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(Number(booking.service.price))}
                </h3>
              </div>
              <div className="flex justify-between">
                <h3 className="text-sm text-gray-700">Data</h3>
                <h4 className="text-sm ">
                  {format(booking.date, "dd 'de' MMMM", {
                    locale: ptBR,
                  })}
                </h4>
              </div>

              <div className="flex justify-between">
                <h3 className="text-sm text-gray-700">Horário</h3>
                <h4 className="text-sm ">{format(booking.date, "hh:mm")}</h4>
              </div>
              <div className="flex justify-between">
                <h3 className="text-sm text-gray-700">Pet Shop</h3>
                <h4 className="text-sm ">{booking.petshop.name}</h4>
              </div>
              <div className="flex justify-between">
                <h3 className="text-sm text-gray-700">Endereço</h3>
                <h4 className="text-sm ">{booking.petshop.address}</h4>
              </div>
            </CardContent>
          </Card>

          <SheetFooter className="flex flex-row gap-3 mt-6">
            <SheetClose asChild>
              <Button variant="secondary" className="w-full">
                Voltar
              </Button>
            </SheetClose>
            <Button
              onClick={handleCancelClick}
              disabled={isBookingConfirmed || isDeleteLoading}
              variant="destructive"
              className="w-full"
            >
              {isDeleteLoading && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Cancelar
            </Button>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default BookingItem;
