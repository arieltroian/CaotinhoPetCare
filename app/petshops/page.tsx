import { redirect } from "next/navigation";
import PetShopItem from "../(home)/_components/petshop-item";
import Search from "../(home)/_components/search";
import Header from "../_components/header";
import { db } from "../_lib/prisma";

interface PetShopsPageProps {
  searchParams: {
    search?: string;
  };
}

const PetShopsPage = async ({ searchParams }: PetShopsPageProps) => {
  if (!searchParams.search) {
    return redirect("/");
  }
  const petshops = await db.petshop.findMany({
    where: {
      name: {
        contains: searchParams.search,
        mode: "insensitive",
      },
    },
  });
  return (
    <>
      <Header />
      <div className="px-5 lg:px-28 py-6 mt-6">
        <Search
          defaultValues={{
            search: searchParams.search,
          }}
        />
        <h1 className="mb-3 px-5 mt-6 lg:px-28 text-xs lg:text-sm uppercase text-gray-800 font-bold">
          Resultados para &quot;{searchParams.search}&quot;
        </h1>
        <div className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
          {petshops.map((petshop) => (
            <PetShopItem key={petshop.id} petshop={petshop} />
          ))}
        </div>
      </div>
    </>
  );
};

export default PetShopsPage;
