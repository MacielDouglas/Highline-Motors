"use client";

import Image from "next/image";
import { CardCarProps } from "./CardCar.types";
import { Fuel, Gauge, Gem, Trash2, Upload, Users, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ButtonEditCar } from "./ButtonEditCar";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";

export function CardCar(props: CardCarProps) {
  const { car } = props;

  const router = useRouter();

  const deleteCar = async () => {
    try {
      await axios.delete(`/api/car/${car.id}`);
      toast.success("Carro deletado com sucesso.");
      router.refresh();
    } catch (error) {
      toast.error("Erro ao deletar o carro.");
    }
  };

  const handlePublishCar = async (publish: boolean) => {
    try {
      await axios.patch(`/api/car/${car.id}`, { isPublish: publish });
      if (publish) {
        toast.success("Veículo publicado");
      } else {
        toast.success("Veiculo não publicado");
      }
      router.refresh();
    } catch (error) {
      toast.error("Erro ao publicar o carro.: ", error);
    }
  };

  return (
    <div className="relative p-1 bg-white rounded-lg shadow-md hover:shadow-lg">
      <Image
        src={car.photo}
        alt={car.name}
        width={400}
        height={600}
        className="rounded-lg"
      />
      {car.isPublish ? (
        <p className="rounded-t-lg absolute top-0 right-0 w-full p-1 text-center text-white bg-green-700">
          Publicado
        </p>
      ) : (
        <p className="rounded-t-lg absolute top-0 right-0 w-full p-1 text-center text-white bg-red-500">
          Não publicado
        </p>
      )}

      <div className="relative p-3">
        <div className="flex flex-col mb-3 gap-x-4">
          <p className="text-xl min-h-16 lg:min-f-fit">{car.name}</p>
          <p>Diaria R$ {car.priceDay}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-x-4">
          <p className="flex items-center">
            <Gem className="h-4 w-4 mr-2 stokeWidth={1}" />
            {car.type}
          </p>
          <p className="flex items-center">
            <Wrench className="h-4 w-4 mr-2 stokeWidth={1}" />
            {car.transmission}
          </p>
          <p className="flex items-center">
            <Users className="h-4 w-4 mr-2 stokeWidth={1}" />
            {car.people}
          </p>
          <p className="flex items-center">
            <Fuel className="h-4 w-4 mr-2 stokeWidth={1}" />
            {car.engine}
          </p>
          <p className="flex items-center">
            <Gauge className="h-4 w-4 mr-2 stokeWidth={1}" />
            {car.cv} CV
          </p>
        </div>
        <div className="flex justify-between mt-3 gap-x-4">
          <Button variant="destructive" onClick={() => deleteCar()}>
            Delete <Trash2 className="w-4 h-4 ml-2" />
          </Button>

          <ButtonEditCar carData={car} />
        </div>
        {car.isPublish ? (
          <Button
            className="w-full mt-3 "
            variant="outline"
            onClick={() => handlePublishCar(false)}
          >
            Não Publicar <Upload className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Button
            className="w-full mt-3"
            onClick={() => handlePublishCar(true)}
          >
            Publicar <Upload className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
}
