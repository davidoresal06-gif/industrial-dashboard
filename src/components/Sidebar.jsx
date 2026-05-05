import { Link, useLocation } from "react-router-dom";
import {
  BoltIcon,
  ChartBarIcon,
  ClipboardDocumentCheckIcon,
  Cog6ToothIcon,
  CubeIcon,
  CurrencyDollarIcon,
  LifebuoyIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";
import ClientSelector from "./ClientSelector";
import { canAccess } from "";

export default function Sidebar({ user, clientId, onClientChange }) {
  const location = useLocation();
  const menuItems = [
    { name: "Sectores", path: "/sectores", permission: "sectores", icon: <Squares2X2Icon /> },
    { name: "Monitoreo", path: "/monitoreo", permission: "monitoreo", icon: <ChartBarIcon /> },
    { name: "Activos", path: "/activos", permission: "activos", icon: <CubeIcon /> },
    { name: "ROI y precios", path: "/roi", permission: "roi", icon: <CurrencyDollarIcon /> },
    { name: "Propuesta", path: "/propuesta", permission: "propuesta", icon: <ClipboardDocumentCheckIcon /> },
    { name: "Soporte", path: "/soporte", permission: "soporte", icon: <LifebuoyIcon /> },
    { name: "Admin", path: "/admin", permission: "admin", icon: <Cog6ToothIcon /> },
  ].filter((item) => canAccess(user, item.permission));

  return (
    <aside className="sidebar">
      <div className="logo">
        <BoltIcon className="logo-icon" />
        <div>
          <h2>INDUS-VUE</h2>
          <span>Enterprise OS</span>
        </div>
      </div>

      <ClientSelector clientId={clientId} onClientChange={onClientChange} />

      <nav>
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={location.pathname === item.path ? "active" : ""}
          >
            {item.icon}
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
      <div className="sidebar-user">
        <strong>{user?.name || "Usuario"}</strong>
        <span>{user?.role || "Operacion"} | {user?.title || "Demo"}</span>
      </div>
    </aside>
  );
}
