import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Menu, X } from "lucide-react";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Mobile Menu Button */}
      <div className="md:hidden p-4 flex items-center justify-between shadow-md bg-white z-20 fixed w-full top-0">
        <h1 className="text-xl font-bold text-gray-900">Gerencie AI</h1>
        <button
          onClick={toggleSidebar}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div className="flex flex-1 pt-16 md:pt-0">
        {/* Sidebar - Hidden on mobile by default */}
        <div
          className={`fixed inset-y-0 left-0 transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:relative md:translate-x-0 transition-transform duration-200 ease-in-out w-64 bg-white shadow-lg md:shadow-none h-full z-10`}
        >
          <Sidebar />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col md:ml-8">
          {/* Header remains here for desktop/tablet, hidden by mobile button div on mobile */}
          <Header />
          <main className="flex-1 px-4 py-6">
            <div className="max-w-7xl mx-auto">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
      {/* Overlay for Mobile when sidebar is open */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-5 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default Layout;
