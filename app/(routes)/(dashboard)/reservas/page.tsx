import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";

const pageReserves = async () => {
  const { userId } = await auth();

  if (!userId) return redirect("/");

  const order = await db.order.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  console.log(order);

  return (
    <div>
      <h1 className="mb-4 text-3xl">Rervas de veículos</h1>
      {order.length === 0 ? (
        <div className="flex flex-col justify-center gap-4 items-center">
          <h2>Não tem nenhuma reserva!!!</h2>
          <p>Reserve agora o seu veículo</p>
          <Link href="/dashboard">
            <Button>Lista de veículos</Button>
          </Link>
        </div>
      ) : (
        <>
          <div>reservas</div>
        </>
      )}
    </div>
  );
};

export default pageReserves;
