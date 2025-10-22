import { ButtonAddCar } from "./components/ButtonAddCar";

export default function CarsManagerPage() {
    return (
        <div className="flex justify-between">
            <h2 className="text-2xl font-bold">
                Gerência seu carro
            </h2>
            <ButtonAddCar/>
        </div>
    )
}