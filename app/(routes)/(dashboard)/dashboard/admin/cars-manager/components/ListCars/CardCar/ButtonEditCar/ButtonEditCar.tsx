"use client"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ButtonEditCarProps } from "./ButtonEditCar.types";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PencilIcon } from "lucide-react";
import { FormEditCar } from "../FormEditCar";
// import { DialogTrigger } from "@radix-ui/react-dialog";


export  function ButtonEditCar(props: ButtonEditCarProps) {
    const {carData} = props;
    const [isOpenDialog, setIsOpenDialog] = useState(false);


  return (
   <Dialog open={isOpenDialog}>
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
        </DialogHeader>
            <DialogDescription>
               <FormEditCar setIsOpenDialog={setIsOpenDialog} carData={carData} />
            </DialogDescription>
    </DialogContent>
   </Dialog>
  )
}
