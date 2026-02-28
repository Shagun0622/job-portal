import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import Sidebar from "../components/Sidebar";
import { Menu, X } from "lucide-react";

const Dashboard = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">

      {/* Top Navbar */}
      <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-5 md:px-8 sticky top-0 z-20 shadow-sm">
        <div className="flex items-center gap-3">
          {/* Mobile menu button */}
          <button
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-600 transition-colors"
            onClick={() => setShowSidebar(true)}
          >
            <Menu size={20} />
          </button>

          <img
            src={assets.logo}
            alt="logo"
            className="h-7 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => navigate("/")}
          />
        </div>

        {/* Profile */}
        <div className="relative group cursor-pointer">
          <div className="flex items-center gap-2.5">
            <span className="text-sm font-medium text-gray-700 hidden sm:block">
              Hi, <span className="text-gray-900">Richard</span>
            </span>
            <img
              src={assets.company_icon}
              alt="profile"
              className="w-9 h-9 rounded-full border-2 border-gray-100 object-cover"
            />
          </div>

          {/* Dropdown */}
          <div className="absolute right-0 mt-3 w-44 bg-white border border-gray-100 rounded-xl shadow-lg hidden group-hover:block overflow-hidden">
            <p className="px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer">
              My Profile
            </p>
            <div className="h-px bg-gray-100" />
            <p className="px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition-colors cursor-pointer">
              Logout
            </p>
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="flex flex-1">

        {/* Desktop Sidebar */}
        <aside className="w-60 border-r border-gray-100 bg-white hidden md:block shadow-sm">
          <Sidebar />
        </aside>

        {/* Mobile Sidebar */}
        {showSidebar && (
          <div
            className="fixed inset-0 z-50 md:hidden"
            onClick={() => setShowSidebar(false)}
          >
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
            <aside
              className="absolute left-0 top-0 bottom-0 w-64 bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                <span className="font-semibold text-gray-800 text-sm">Menu</span>
                <button
                  onClick={() => setShowSidebar(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-500 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
              <Sidebar onClick={() => setShowSidebar(false)} />
            </aside>
          </div>
        )}

        {/* Content */}
        <main className="flex-1 p-5 md:p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;