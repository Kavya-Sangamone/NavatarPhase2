// import React, { useState, useEffect } from "react";
// import { Plus, Building2} from "lucide-react";
// import { AddStaffForm } from "./components/AddStaffForm";
// import { StaffList } from "./components/StaffList";
// import { EditStaffModal } from "./components/EditStaffModal";
// import { listDoctors } from "./apis/doctorApis";
// import { getNavatarsByHospital } from "./apis/navatarApis";
// import { getNursesByHospital } from "./apis/nurseApis";
// import { createDoctor } from "./apis/doctorApis";
// import { createNurse } from "./apis/nurseApis";
// import { updateDoctor } from "./apis/doctorApis";
// import { updateNurse } from "./apis/nurseApis";
// import { deleteDoctor } from "./apis/doctorApis";
// import { deleteNurse } from "./apis/nurseApis";
// import Sidebar from "./components/Sidebar";
// import LoginPage from "./components/LoginPage";


// import "./App.css";

// // dummy admin
// const defaultAdmin = {
//   admin_name: "string",
//   hospital_id: 13,
//   email: "user@example.com",
//   password: "string",
// };

// function App() {
//   const [staff, setStaff] = useState([]);
//   const [admin, setAdmin] = useState(() => {
//     const saved = localStorage.getItem("admin");
//     return saved ? JSON.parse(saved) : null;
//   });


//   const [isAddFormOpen, setIsAddFormOpen] = useState(false);
//   const [editingStaff, setEditingStaff] = useState(null);
//   const [doctors, setDoctors] = useState([]);
//   const [navatars, setNavatars] = useState([]);
//   const [nurses, setNurses] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     localStorage.setItem("admin", JSON.stringify(admin));
//   }, [admin]);



//   const fetchAllData = async () => {
//     try {
//       setLoading(true);
//       const [doctorRes, navatarRes, nurseRes] = await Promise.all([
//         listDoctors(admin.hospital_id),
//         getNavatarsByHospital(admin.hospital_id),
//         getNursesByHospital(admin.hospital_id),
//       ]);

//       setDoctors(doctorRes.data);
//       setNavatars(navatarRes.data);
//       setNurses(nurseRes.data);

//       // Combine all into staff
//       const combinedStaff = [
//         ...doctorRes.data.map((doc) => ({
//           id: doc.id,
//           name: doc.name,
//           email: doc.email,
//           phone: doc.phone,
//           department: doc.department,
//           role: "Doctor",
//         })),
//         ...nurseRes.data.map((nurse) => ({
//           id: nurse.id,
//           name: nurse.name,
//           email: nurse.email,
//           phone: nurse.phone,
//           department: nurse.department,
//           role: "Nurse",
//         })),
//       ];

//       setStaff(combinedStaff);
//     } catch (error) {
//       console.error("Error fetching hospital data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (!admin) return;
//     fetchAllData();
//   }, [admin]);

//   const handleAddStaff = async (newStaffData) => {
//     const payload = { ...newStaffData };
//     delete payload.role;

//     try {
//       if (newStaffData.role === "Doctor") {
//         delete payload.assigned_doctor_id;
//         await createDoctor(admin.hospital_id, payload);
//       } else if (newStaffData.role === "Nurse") {
//         await createNurse(admin.hospital_id, payload);
//       }

//       alert("Staff added successfully");
//       fetchAllData();
//     } catch (error) {
//       console.error("Failed to add staff:", error);

//       const message =
//         error.response?.data?.detail ||
//         error.message ||
//         "Failed to add staff. Please try again.";

//       alert(message);
//     }
//   };

//   const handleEditStaff = async (updatedStaff) => {
//     const { role, id, ...rest } = updatedStaff;

//     try {
//       if (role === "Doctor") {
//         const { assigned_doctor_id, ...doctorData } = rest;
//         await updateDoctor(id, doctorData);
//       } else {
//         await updateNurse(id, rest);
//       }

//       setStaff((prev) =>
//         prev.map((s) => (s.id === updatedStaff.id ? updatedStaff : s))
//       );
//       setEditingStaff(null);
//       alert("Staff updated successfully");
//       fetchAllData();
//     } catch (error) {
//       console.error("Failed to update staff:", error);

//       const message =
//         error.response?.data?.detail ||
//         error.message ||
//         "Failed to update staff. Please try again.";

//       const errMsg =
//         typeof error?.response?.data?.detail === "string"
//           ? error.response.data.detail
//           : error?.message || "Something went wrong";

//       alert(errMsg);

//     }
//   };

//   const handleDeleteStaff = async (id, role) => {
//     if (!window.confirm("Are you sure you want to delete this staff member?")) return;

//     try {
//       if (role === "Doctor") {
//         await deleteDoctor(id);
//       } else {
//         await deleteNurse(id);
//       }

//       setStaff((prev) => prev.filter((s) => s.id !== id));
//       alert("Deleted successfully");
//       fetchAllData();
//     } catch (error) {
//       console.error("Failed to delete staff:", error);
//       alert(error.response?.data?.detail || error.message || "Something went wrong");
//     }
//   };
//   if (!admin) {
//     return (
//       <LoginPage
//         onLogin={(adminData) => {
//           print("Admin data received:", adminData);
//           setAdmin(adminData);
//           localStorage.setItem("admin", JSON.stringify(adminData));
//         }}
//       />
//     );
//   }


//   return (
//   <div className="flex min-h-screen">
//     {/* Sidebar on the left */}
//     <Sidebar />

//     {/* Main content on the right */}
//     <div className="flex-1 flex flex-col">
//       {/* Header */}
//       <header className="header bg-white shadow px-6 py-4 flex justify-between items-center">
//         <div className="flex items-center gap-4">
//           <Building2 className="text-blue-800 w-6 h-6" />
//           <div>
//             <h1 className="text-xl font-bold text-blue-900">Hospital Staff Management</h1>
//             <p className="text-sm text-gray-600">Manage doctors and nurses</p>
//           </div>
//         </div>

//         <button
//           onClick={() => setIsAddFormOpen(true)}
//           className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
//         >
//           <Plus className="w-5 h-5" />
//           Add Staff
//         </button>
//       </header>

//       {/* Main Content */}
//       <main className="p-6">
//         <StaffList
//           staff={staff}
//           navatars={navatars}
//           onDelete={handleDeleteStaff}
//           onEdit={setEditingStaff}
//         />
//       </main>
//     </div>

//     {/* Modals */}
//     <AddStaffForm
//       isOpen={isAddFormOpen}
//       onClose={() => setIsAddFormOpen(false)}
//       onAddStaff={handleAddStaff}
//       doctors={doctors}
//     />

//     <EditStaffModal
//       staff={editingStaff}
//       onSave={handleEditStaff}
//       onClose={() => setEditingStaff(null)}
//       doctors={doctors}
//     />
//   </div>
// );

// }

// export default App;
// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/dashboard";

function App() {
  const storedAdmin = localStorage.getItem("admin");
  const [admin, setAdmin] = React.useState(() => (storedAdmin ? JSON.parse(storedAdmin) : null));

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            admin ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <LoginPage onLogin={(data) => setAdmin(data)} />
            )
          }
        />
        <Route
          path="/dashboard"
          element={<Dashboard admin={admin} />}
        />
      </Routes>
    </Router>
  );
}

export default App;