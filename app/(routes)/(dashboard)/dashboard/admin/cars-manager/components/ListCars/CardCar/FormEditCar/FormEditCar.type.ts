import { Car } from "@/lib/generated/prisma/client"
import { Dispatch, SetStateAction } from "react";

export type FormEditCarProps  = {
    carData: Car;
    setIsOpenDialog: Dispatch<SetStateAction<boolean>>
}