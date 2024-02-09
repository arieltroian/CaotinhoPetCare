"use client";

import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Service } from "@prisma/client";
import { signIn } from "next-auth/react";
import Image from "next/image";

interface ServiceItemProps {
  service: Service;
  isAuthenticaded?: boolean;
}

const ServiceItem = ({ service, isAuthenticaded }: ServiceItemProps) => {
  const handleBookingClick = () => {
    if (!isAuthenticaded) {
      return signIn("google");
    }
    // TODO: Abrir modal de agendamento
  };
  return (
    <Card>
      <CardContent className="p-3">
        <div className="flex gap-4 items-center w-full">
          <div className="relative min-h-[110px] min-w-[110px] max-h-[110px]">
            <Image
              src={service.imageUrl}
              fill
              style={{
                objectFit: "cover",
              }}
              sizes="100vw"
              alt={service.name}
              className="rounded-lg"
            />
          </div>

          <div className="flex flex-col w-full">
            <h2 className="font-bold">{service.name}</h2>
            <p className="text-sm text-gray-400">{service.description}</p>

            <div className="flex itmes-center justify-between mt-2">
              <p className="text-sm font-bold text-primary">
                {Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(Number(service.price))}
              </p>
              <Button variant="secondary" onClick={handleBookingClick}>
                Reservar
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceItem;
