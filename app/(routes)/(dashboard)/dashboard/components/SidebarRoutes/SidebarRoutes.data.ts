import { Calendar, Car, HeartIcon } from "lucide-react";

export const dataGeneralSideBar = [
    {
        icon: Car,
        label: "Cars",
        href: "/dashboard"
    },
    {
        icon: Calendar,
        label: "Reservas Veículos",
        href: "/reservas"
    },
    {
        icon: HeartIcon,
        label: "Favoritos",
        href: "/favoritos"
    },
]

export const dataAdminSideBar = [
     {
        icon: Car,
        label: "Administrar Veículos",
        href: "/dashboard"
    },
     {
        icon: Calendar,
        label: "Todas as reservas",
        href: "/dashboard"
    },
]