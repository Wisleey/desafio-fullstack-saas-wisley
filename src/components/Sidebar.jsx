"use client";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  CheckSquare,
  User,
  LogOut,
  CreditCard,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

const Sidebar = () => {
  const { logout } = useAuth();

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Times", href: "/teams", icon: Users },
    { name: "Tarefas", href: "/tasks", icon: CheckSquare },
    { name: "Planos", href: "/choose-plan", icon: CreditCard },
    { name: "Perfil", href: "/profile", icon: User },
  ];

  return (
    <div className="w-64 bg-white shadow-lg h-screen flex flex-col overflow-y-auto">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-900">Gerencie AI</h1>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                isActive
                  ? "bg-primary-100 text-primary-700 border-r-2 border-primary-600"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`
            }
          >
            <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
            <span className="truncate">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <button
          onClick={logout}
          className="flex items-center w-full px-4 py-3 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition-colors"
        >
          <LogOut className="mr-3 h-5 w-5 flex-shrink-0" />
          <span className="truncate">Sair</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
