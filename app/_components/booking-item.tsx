import { Booking, Prisma } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { format, isPast } from "date-fns";
import { ptBR } from "date-fns/locale";

interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: true;
      petshop: true;
    };
  }>;
}

const BookingItem = ({ booking }: BookingItemProps) => {
  const isBookingConfirmed = isPast(booking.date);
  return (
    <Card className="min-w-[70%]">
      <CardContent className="px-0 py-0 flex">
        <div className="flex flex-col flex-[3] gap-2 py-5 pl-5">
          <Badge
            variant={isBookingConfirmed ? "secondary" : "default"}
            className="w-fit"
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
  );
};

export default BookingItem;
