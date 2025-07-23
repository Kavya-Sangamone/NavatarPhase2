import React from "react";
import { NavLink } from "react-router-dom";
import {
  Stethoscope,
  Syringe,
  LayoutDashboard,
  CalendarDays,
  Building2,
} from "lucide-react";

const Sidebar = () => {
  return (
    <div className="w-64 bg-[#e3f2fd] min-h-screen shadow-md">
      {/* Top Section */}
      <div className="p-6 border-b border-[#bbdefb]">
        <h2 className="text-2xl font-bold text-[#0d47a1]">Navtar Hospital</h2>
      </div>

      {/* Navigation Links */}
      <nav className="p-4 space-y-2 text-[#0d47a1]">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
              isActive ? "bg-[#1976d2] text-white" : "hover:bg-[#bbdefb]"
            }`
          }
        >
          <LayoutDashboard className="w-5 h-5" />
          Dashboard
        </NavLink>

        <NavLink
          to="/doctors"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
              isActive ? "bg-[#1976d2] text-white" : "hover:bg-[#bbdefb]"
            }`
          }
        >
          <Stethoscope className="w-5 h-5" />
          Doctor Management
        </NavLink>

        <NavLink
          to="/staff"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
              isActive ? "bg-[#1976d2] text-white" : "hover:bg-[#bbdefb]"
            }`
          }
        >
          <Syringe className="w-5 h-5" />
          Nurse Management
        </NavLink>

        <NavLink
          to="/bookings"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
              isActive ? "bg-[#1976d2] text-white" : "hover:bg-[#bbdefb]"
            }`
          }
        >
          <CalendarDays className="w-5 h-5" />
          Booking Management
        </NavLink>

        <NavLink
          to="/navtar"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
              isActive ? "bg-[#1976d2] text-white" : "hover:bg-[#bbdefb]"
            }`
          }
        >
          <Building2 className="w-5 h-5" />
          Navtar Management
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
