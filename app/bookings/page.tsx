import { getServerSession } from "next-auth";
import Header from "../_components/header";
import { redirect } from "next/navigation";
import { db } from "../_lib/prisma";
import BookingItem from "../_components/booking-item";
import { authOptions } from "../_lib/auth";

const BookingsPage = async () => {
  // Recuperar a sessão do usuário (ver se está logado ou nao)
  const session = await getServerSession(authOptions);

  // Se nao estiver logado, redirecionar p/ pág de login ou initial page
  if (!session?.user) {
    return redirect("/");
  }

  const [confirmedBookings, finishedBookings] = await Promise.all([
    db.booking.findMany({
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
    }),

    db.booking.findMany({
      where: {
        userId: (session.user as any).id,
        date: {
          lt: new Date(),
        },
      },
      include: {
        service: true,
        petshop: true,
      },
    }),
  ]);

  return (
    <>
      <Header />
      <div className="px-5 py-6 lg:px-28">
        <h1 className="text-xl font-bold mb-6">Agendamentos</h1>

        {confirmedBookings.length > 0 && (
          <>
            <h2 className="mb-3 text-gray-800 uppercase text-xs lg:text-sm font-bold">
              Atendimentos Confirmados
            </h2>
            <div className="flex flex-col gap-3 lg:gap-4 lg:items-center lg:justify-center">
              {confirmedBookings.map((booking) => (
                <BookingItem key={booking.id} booking={booking} />
              ))}
            </div>
          </>
        )}

        {finishedBookings.length > 0 && (
          <>
            <h2 className="mt-8 mb-3 text-gray-800 uppercase text-xs lg:text-sm font-bold">
              Atendimentos Finalizados
            </h2>
            <div className="flex flex-col gap-3 lg:gap-4 lg:px-20 lg:items-center lg:justify-center">
              {finishedBookings.map((booking) => (
                <BookingItem key={booking.id} booking={booking} />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default BookingsPage;
