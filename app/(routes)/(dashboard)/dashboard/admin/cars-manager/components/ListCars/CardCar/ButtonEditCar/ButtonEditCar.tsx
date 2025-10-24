"use client"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ButtonEditCarProps } from "./ButtonEditCar.types";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PencilIcon } from "lucide-react";
import { FormEditCar } from "../FormEditCar";



export  function ButtonEditCar(props: ButtonEditCarProps) {
    const {carData} = props;
    const [isOpenDialog, setIsOpenDialog] = useState(false);


  return (
   <Dialog open={isOpenDialog} >
    <DialogTrigger asChild>
        <Button variant="outline" onClick={() => setIsOpenDialog(true)}>
            Editar <PencilIcon className="w-4 h-4 ml-2" />

        </Button>
    </DialogTrigger>
    <DialogContent>
        <DialogHeader>
            <DialogTitle>
                Formulario
            </DialogTitle>
        <DialogDescription>
Formulário para modificar um novo carro ao sistema.
        </DialogDescription>
        </DialogHeader>
               <FormEditCar setIsOpenDialog={setIsOpenDialog} carData={carData} />
    </DialogContent>
   </Dialog>
  )
}