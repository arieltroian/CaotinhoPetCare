import { ptBR } from "date-fns/locale";
import Header from "../_components/header";
import { format } from "date-fns";
import Search from "./_components/search";
import BookingItem from "../_components/booking-item";
import { db } from "../_lib/prisma";
import PetShopItem from "./_components/petshop-item";

export default async function Home() {
  // Chamar prisma e pegar pet shops
  const petshops = await db.petshop.findMany({});

  return (
    <div>
      <Header />
      <div className="px-5 pt-5">
        <h2 className="text-xl font-bold">Olá, Miguel!</h2>
        <p className="capitalize text-sm">
          {format(new Date(), "EEEE',' d 'de' MMMM", {
            locale: ptBR,
          })}
        </p>
      </div>

      <div className="px-5 mt-6">
        <Search />
      </div>

      {/* <div className="px-5 mt-6">
        <h2 className="mb-3 text-xs uppercase text-gray-400 font-bold">
          Agendamentos
        </h2>
        <BookingItem />
      </div> */}

      <div className="mt-6">
        <h2 className="px-5 mb-3 text-xs uppercase text-gray-700 font-bold">
          Recomendados
        </h2>
        <div className="flex gap-4 px-5 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {petshops.map((petshop) => (
            <PetShopItem key={petshop.id} petshop={petshop} />
          ))}
        </div>
      </div>

      <div className="mt-6 mb-[4.5rem]">
        <h2 className="px-5 mb-3 text-xs uppercase text-gray-700 font-bold">
          Populares
        </h2>
        <div className="flex gap-4 px-5 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {petshops.map((petshop) => (
            <PetShopItem key={petshop.id} petshop={petshop} />
          ))}
        </div>
      </div>
    </div>
  );
}
