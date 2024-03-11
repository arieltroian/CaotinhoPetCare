import { ptBR } from "date-fns/locale";
import Header from "../_components/header";
import { format } from "date-fns";
import Search from "./_components/search";
import BookingItem from "../_components/booking-item";
import { db } from "../_lib/prisma";
import PetShopItem from "./_components/petshop-item";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { Card } from "../_components/ui/card";
import { authOptions } from "../_lib/auth";

export default async function Home() {
  const session = await getServerSession(authOptions);

  const [petshops, confirmedBookings] = await Promise.all([
    db.petshop.findMany({}),

    session?.user
      ? db.booking.findMany({
          where: {
            userId: (session.user as any).id,
            date: {
              gte: new Date(),
            },
          },
          include: {
            service: true,
            petshop: true,
          },
        })
      : Promise.resolve([]),
  ]);

  return (
    <div>
      <Header />
      <Card className="pb-5 mx-5 lg:mx-28 bg-primary my-6">
        <div className="flex flex-col lg:flex-row items-center justify-around px-5 pt-5 lg:px-28">
          <div>
            <h2 className="text-xl font-bold">
              {session?.user ? (
                <div>
                  {`Olá, ${session.user.name?.split(" ")[0]}!`}
                  <div className="text-2xl mt-2">
                    O que o seu pet precisa hoje?
                  </div>
                </div>
              ) : (
                <div>
                  Olá!
                  <div className="text-2xl mt-2">
                    O que o seu pet precisa hoje?
                  </div>
                </div>
              )}
            </h2>
            <p className="capitalize text-sm">
              {format(new Date(), "EEEE',' d 'de' MMMM", {
                locale: ptBR,
              })}
            </p>

            <div className="flex w-full my-6">
              <Search />
            </div>
          </div>

          <div>
            <Image
              src="/homepage-image.jpeg"
              width={0}
              height={0}
              alt=""
              className="w-[24rem] h-auto rounded-full shadow-lg"
              sizes="100vw"
            />
          </div>
        </div>
      </Card>

      <div className="mt-6">
        {confirmedBookings.length > 0 && (
          <>
            <h2 className="mb-3 px-5 mt-6 lg:px-28 text-xs lg:text-sm uppercase text-gray-800 font-bold">
              Agendamentos
            </h2>
            <div className="flex px-5 mt-6 gap-3 lg:px-28 overflow-x-auto [&::-webkit-scrollbar]:hidden">
              {confirmedBookings.map((booking) => (
                <BookingItem key={booking.id} booking={booking} />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="mt-6">
        <h2 className="px-5 mb-3 lg:px-28 text-xs lg:text-sm uppercase text-gray-800 font-bold">
          Petshops Recomendados pra você
        </h2>

        <div className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
          {petshops.map((petshop) => (
            <PetShopItem key={petshop.id} petshop={petshop} />
          ))}
        </div>
      </div>
    </div>
  );
}
