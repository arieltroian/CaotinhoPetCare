import { db } from "@/app/_lib/prisma";
import PetShopInfo from "./_components/petshop-info";
import ServiceItem from "./_components/service-item";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

interface PetshopDetailsPageProps {
  params: {
    id?: string;
  };
}

const PetshopDetailsPage = async ({ params }: PetshopDetailsPageProps) => {
  const session = await getServerSession(authOptions);
  if (!params.id) {
    // TODO: redirecionar para a Home Page
    return null;
  }
  const petshop = await db.petshop.findUnique({
    where: {
      id: params.id,
    },
    include: {
      services: true,
    },
  });

  if (!petshop) {
    // TODO: redirecionar para a Home Page
    return null;
  }
  return (
    <div>
      <PetShopInfo petshop={petshop} />

      <div className="px-5 flex flex-col gap-4 py-6">
        {petshop.services.map((service) => (
          <ServiceItem
            key={service.id}
            service={service}
            isAuthenticaded={!!session?.user}
          />
        ))}
      </div>
    </div>
  );
};

export default PetshopDetailsPage;
