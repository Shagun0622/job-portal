import React from "react";
import { NavLink } from "react-router-dom";

const navItems = [
  { to: "manage-jobs", icon: "🧾", label: "Manage Jobs" },
  { to: "add-job", icon: "➕", label: "Add Job" },
  { to: "view-applications", icon: "👤", label: "View Applications" },
];

const Sidebar = ({ onClick }) => {
  return (
    <nav className="pt-4 px-3">
      <div className="space-y-1">
        {navItems.map(({ to, icon, label }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onClick}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? "bg-blue-600 text-white shadow-sm shadow-blue-200"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`
            }
          >
            <span className="text-base">{icon}</span>
            <span>{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default Sidebar;