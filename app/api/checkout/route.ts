import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Configuração de CORS
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  // Necessário para permitir requisições CORS pré-flight
  return new NextResponse(null, { headers: corsHeaders });
}

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Não autorizado", { status: 401 });
    }

    const { carId, priceDay, startDate, endDate, carName } = await req.json();

    if (!carId || !priceDay || !startDate || !endDate || !carName) {
      return new NextResponse("Dados incompletos", { status: 400 });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return new NextResponse("Datas inválidas", { status: 400 });
    }

    // Calcula número de dias (incluindo o dia inicial)
    const numberOfDays = Math.ceil(
      (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
    );

    const totalAmount = Number(priceDay) * numberOfDays;

    // Cria o pedido no banco de dados
    const order = await db.order.create({
      data: {
        carId,
        carName,
        userId,
        status: "confirmed",
        totalAmount: totalAmount.toFixed(2),
        orderDate: start,
        orderEndDate: end,
      },
    });

    // Aqui você poderia integrar um sistema de pagamento (ex: Stripe)
    // const session = await stripe.checkout.sessions.create(...)

    return NextResponse.json(
      {
        message: "Pedido criado com sucesso",
        order,
      },
      { headers: corsHeaders }
    );
  } catch (error) {
    console.error("[ORDER_POST_ERROR]", error);
    return new NextResponse("Erro interno do servidor", { status: 500 });
  }
}
