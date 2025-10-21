import { LogoDashboard } from "../LogoDashboard";
import { SidebarRoutes } from "../SidebarRoutes";


export  function Sidebar() {
  return (
    <div className="h-screen">
        <div className="flex w-full flex-col h-full border-r">
            <LogoDashboard/>
            <SidebarRoutes/>
        </div>
    </div>
  )
}
