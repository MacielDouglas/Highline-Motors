"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { PlusCircle } from "lucide-react"
import { useState } from "react"
import { FormAddCar } from "../FormAddCar"


export  function ButtonAddCar() {

    const[openDialog, setOpenDialog] = useState(false)


  return (
 

   <Dialog open={openDialog} >
    <DialogTrigger asChild>
        <Button className="cursor-pointer" variant="outline" onClick={() => setOpenDialog(true)}>Adicionar novo carro <PlusCircle className="ml-2"/></Button>
    </DialogTrigger>
    <DialogContent >
        <DialogHeader>
        <DialogTitle>
            Adicionar novo carro
        </DialogTitle>
            <DialogDescription>
                Formulário para adicionar um novo carro ao sistema.        
            </DialogDescription>
        </DialogHeader>
               <FormAddCar setOpenDialog={setOpenDialog}/>
    </DialogContent>
   </Dialog>

  )
}
