import { LogoDashboard } from "../LogoDashboard";
import { SidebarRoutes } from "../SidebarRoutes";


export  function Sidebar() {
  return (
    <div className="h-scree">
        <div className="flex flex-col h-full border-r">
            <LogoDashboard/>
            <SidebarRoutes/>
        </div>
    </div>
  )
}
