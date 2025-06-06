"use client";
import { useAuth } from "../contexts/AuthContext";
import { Bell, Search } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import api from "../services/api";

const Header = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const notificationsRef = useRef(null);
  const bellRef = useRef(null);

  useEffect(() => {
    let intervalId;
    if (user) {
      fetchNotifications();

      intervalId = setInterval(fetchNotifications, 30000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [user]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target) &&
        bellRef.current &&
        !bellRef.current.contains(event.target)
      ) {
        setIsNotificationsOpen(false);
      }
    };

    if (isNotificationsOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isNotificationsOpen]);

  const fetchNotifications = async () => {
    console.log("Header: Iniciando busca por notificações...");
    try {
      const response = await api.get("/notifications/me");
      console.log("Header: Resposta da API de notificações:", response);
      if (
        response &&
        response.data &&
        Array.isArray(response.data.notifications)
      ) {
        setNotifications(response.data.notifications);
        const count = response.data.notifications.filter(
          (notif) => !notif.read
        ).length;
        setUnreadCount(count);
        console.log(
          "Header: Notificações setadas (total, não lidas):",
          response.data.notifications.length,
          count
        );
      } else {
        console.error(
          "Header: Resposta inesperada ao buscar notificações:",
          response
        );
        setNotifications([]);
        setUnreadCount(0);
      }
    } catch (error) {
      console.error("Header: Erro ao buscar notificações:", error);
      setNotifications([]);
      setUnreadCount(0);
    }
  };

  const markAllAsRead = async () => {
    try {
      await api.post("/notifications/mark-read");

      setNotifications(
        notifications.map((notif) => ({ ...notif, read: true }))
      );
      setUnreadCount(0);
      console.log(
        "Header: Todas as notificações marcadas como lidas no frontend."
      );
    } catch (error) {
      console.error("Header: Erro ao marcar notificações como lidas:", error);
    }
  };

  const handleBellClick = () => {
    if (!isNotificationsOpen && unreadCount > 0) {
      markAllAsRead();
    }
    setIsNotificationsOpen(!isNotificationsOpen);
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-4">
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Buscar tarefas..."
              className="w-full md:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button
            ref={bellRef}
            onClick={handleBellClick}
            className={`p-2 text-gray-400 hover:text-gray-600 transition-colors relative ${
              unreadCount > 0 ? "animate-pulse" : ""
            }`}
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full ring-2 ring-white bg-red-600"></span>
            )}
          </button>

          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">{user?.name}</p>
              <p className="text-xs text-gray-500">{user?.email}</p>
              {user?.plan && (
                <p className="text-xs text-blue-600 font-semibold">
                  Plano: {user.plan.name}
                </p>
              )}
            </div>
            <div className="h-8 w-8 bg-primary-600 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-white">
                {user?.name?.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {isNotificationsOpen && (
        <div
          ref={notificationsRef}
          className="fixed md:absolute top-16 right-4 z-50 w-[calc(100%-2rem)] md:w-80 bg-white rounded-lg shadow-xl border border-gray-200"
        >
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Notificações
            </h3>
            {notifications.length > 0 ? (
              <ul className="space-y-2 text-sm text-gray-700 max-h-60 overflow-y-auto">
                {notifications.map((notif) => (
                  <li
                    key={notif.id}
                    className={`p-2 rounded-md ${
                      notif.read
                        ? "bg-gray-100 text-gray-500"
                        : "bg-blue-50 text-gray-800 font-medium"
                    }`}
                  >
                    {notif.message}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-gray-500">Sem notificações.</p>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
