import React from "react";
import { NavLink } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";
import { getHospitalById } from "../apis/hospitalApi"; // adjust path if needed
import { useState, useEffect } from "react";
import {
  Stethoscope,
  Syringe,
  LayoutDashboard,
  CalendarDays,
  Building2,
} from "lucide-react";

const storedAdmin = localStorage.getItem("admin");
const admin = storedAdmin ? JSON.parse(storedAdmin) : null;

console.log("Admin Data:", admin);
const handleLogout = () => {
    googleLogout(); // Clear Google token
    localStorage.removeItem("admin"); // Optional: Clear stored admin
    window.location.href = "/"; // Redirect to login or landing
  };
const Sidebar = () => {
  const [hospitalName, setHospitalName] = useState("");
   useEffect(() => {
  if (admin?.hospital_id) {
    getHospitalById(admin.hospital_id)
      .then((res) => {
      
        const name = res?.hospital_name;
        if (name) {
          setHospitalName(name);
        } else {
          console.warn("Hospital name not found in response");
        }
      })
      .catch((err) => {
        console.error("Error fetching hospital name", err);
      });
  }
}, [admin?.hospital_id]);


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
        {admin && (
        <div className="p-4 text-sm text-[#0d47a1] border-t border-[#bbdefb]">
          <p><strong>Email:</strong> {admin.email}</p>
          <p><strong>Hospital ID:</strong> {admin.hospital_id}</p>
          <p><strong>Hospital Name:</strong>{hospitalName}</p>
        </div>
      )}
      
       <button
        onClick={handleLogout}
        className="mt-6 bg-red-600 hover:bg-red-700 transition px-4 py-2 rounded text-white text-sm"
      >
          
        Sign Out
      </button>
    </div>
  );
};

export default Sidebar;
