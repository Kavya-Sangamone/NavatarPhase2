import React, { useEffect, useState } from "react";
import "../index.css";
import Sidebar from "../components/Sidebar";
import { listDoctors, updateDoctor, deleteDoctor } from "../apis/doctorApis";

function DoctorManagement() {
  const [doctors, setDoctors] = useState([]);
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [formData, setFormData] = useState({});
  const admin = JSON.parse(localStorage.getItem("admin"));

  const fetchDoctors = async () => {
    try {
      const res = await listDoctors(admin.hospital_id);
      setDoctors(res.data);
    } catch (err) {
      console.error("Error fetching doctors:", err);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, [admin.hospital_id]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this doctor?")) return;
    try {
      await deleteDoctor(id);
      alert("Doctor deleted.");
      fetchDoctors();
    } catch (err) {
      alert("Error deleting doctor.");
      console.error(err);
    }
  };

  const handleEditClick = (doctor) => {
    setEditingDoctor(doctor);
    setFormData({ ...doctor });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateDoctor(editingDoctor.id, formData);
      alert("Doctor updated.");
      setEditingDoctor(null);
      fetchDoctors();
    } catch (err) {
      alert("Failed to update doctor.");
      console.error(err);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar title="Doctor Management"
      subtitle="Manage all registered doctors"uuuu/>
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-blue-900 mb-6">
          Doctor Management
        </h1>

        {doctors.length > 0 ? (
          <table className="w-full bg-white rounded shadow-md overflow-hidden">
            <thead className="bg-blue-100 text-blue-900">
              <tr>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Phone</th>
                <th className="px-4 py-2 border">Department</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((doc) => (
                <tr key={doc.id} className="text-sm">
                  <td className="px-4 py-2 border">{doc.name}</td>
                  <td className="px-4 py-2 border">{doc.email}</td>
                  <td className="px-4 py-2 border">{doc.phone}</td>
                  <td className="px-4 py-2 border">{doc.department}</td>
                  <td className="px-4 py-2 border space-x-2">
                    <button
                      onClick={() => handleEditClick(doc)}
                      className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-xs"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(doc.id)}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-xs"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-600 italic">No doctors found.</p>
        )}
      </div>

      {/* 🛠 Edit Modal */}
      {editingDoctor && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <form
            onSubmit={handleEditSubmit}
            className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md"
          >
            <h2 className="text-xl font-semibold mb-4">Edit Doctor</h2>

            <div className="mb-3">
              <label className="block text-sm font-medium">Name</label>
              <input
                name="name"
                value={formData.name || ""}
                onChange={handleEditChange}
                className="form-input w-full"
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium">Email</label>
              <input
                name="email"
                value={formData.email || ""}
                onChange={handleEditChange}
                className="form-input w-full"
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium">Phone</label>
              <input
                name="phone"
                value={formData.phone || ""}
                onChange={handleEditChange}
                className="form-input w-full"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium">Department</label>
              <input
                name="department"
                value={formData.department || ""}
                onChange={handleEditChange}
                className="form-input w-full"
              />
            </div>

            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setEditingDoctor(null)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default DoctorManagement;
