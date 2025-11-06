"use client";

import { Button } from "@/components/ui/button";
import { ModalReservationProps } from "./ModalReservation.types";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Car } from "@/lib/generated/prisma/client";
import { CalendarSelector } from "./CalendarSelector";
import { useState } from "react";
import { addDays } from "date-fns";
import { DateRange } from "react-day-picker";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function ModalReservation(props: ModalReservationProps) {
  const router = useRouter();
  const { car } = props;
  const [dateSelected, setDateSelected] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: new Date(),
    to: addDays(new Date(), 5),
  });

  const onReserveCar = async (car: Car, dateSelected: DateRange) => {
    try {
      const response = await axios.post("/api/checkout", {
        carId: car.id,
        priceDay: car.priceDay,
        startDate: dateSelected.from,
        endDate: dateSelected.to,
        carName: car.name,
      });

      // Verifique se a resposta indica sucesso no servidor
      if (response.status === 200) {
        toast.success("Carro reservado com sucesso!");
        // Agora redireciona para a página de confirmação
        router.push("/order-confirmation");
      } else {
        toast.error("Falha ao reservar o carro.");
      }
    } catch (error) {
      console.error("Erro ao reservar carro:", error);
      toast.error("Erro ao reservar o carro.");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className=" mt-3">
          Reservar veículo
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Selecionar as datas que quer alugar
          </AlertDialogTitle>
          <AlertDialogDescription>
            <CalendarSelector
              setDateSelected={setDateSelected}
              carPriceDay={car.priceDay}
            />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => onReserveCar(car, dateSelected)}>
            Reservar veículo
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
