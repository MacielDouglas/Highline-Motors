import { auth } from "@clerk/nextjs/server";
import { ButtonAddCar } from "./components/ButtonAddCar";
import { ListCars } from "./components/ListCars";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

export default async function CarsManagerPage()  {

    const {userId} = await auth()

    if (!userId) return redirect("/")

    const cars = await db.car.findMany({
        where: {
            userId,
        },
        orderBy: {
            createdAt: "desc"
        }
    })

    console.log("Lista de carros do usuário: ", cars)

    return (
        <div>

        <div className="flex justify-between">
            <h2 className="text-2xl font-bold">
                Gerência seu carro
            </h2>
            <ButtonAddCar/>
        </div>
            <ListCars cars={cars}/>
        </div>
    )
}