"use client"

import { Separator } from "@/components/ui/separator"
import { useAuth } from "@clerk/nextjs"
import { dataAdminSideBar, dataGeneralSideBar } from "./SidebarRoutes.data"
import { SidebarItem } from "./SidebarItem"


export const SidebarRoutes = () => {

    const {userId } = useAuth()

  return (
    <div  className="flex flex-col h-full">
 
        <div className="p-2 md:p-6">
            <p className="mb-2 text-stone-500">Geral</p>
            {
                dataGeneralSideBar.map(item => (
                    <SidebarItem key={item.label} item={item}/>
                ))
            }
        </div>

        <Separator/>
        <div className="p-2 md:p-6">
            <p className="mb-2 text-stone-500">Admin</p>
            {
                dataAdminSideBar.map(item => (
                     <SidebarItem key={item.label} item={item}/>
                ))
            }


        </div>

        <div className="">
        <Separator/>
        <footer className="p-3 mt-3 text-center">
            2025 &copy; Hight Motors
        </footer>

        </div>
    </div>
  )
}
