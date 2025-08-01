import React, { useEffect, useState } from "react";
import "../index.css";
import Sidebar from "../components/Sidebar";
import { getNursesByHospital, deleteNurse, updateNurse } from "../apis/nurseApis";

function NurseManagement() {
    const [nurses, setNurses] = useState([]);
    const [editingNurse, setEditingNurse] = useState(null);
    const [formData, setFormData] = useState({});
    const admin = JSON.parse(localStorage.getItem("admin"));

    const fetchNurses = async () => {
        try {
            const res = await getNursesByHospital(admin.hospital_id);
            setNurses(res.data);
        } catch (err) {
            console.error("Error fetching nurses:", err);
        }
    };

    useEffect(() => {
        fetchNurses();
    }, [admin.hospital_id]);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this nurse?")) return;
        try {
            await deleteNurse(id);
            alert("Nurse deleted.");
            fetchNurses();
        } catch (err) {
            alert("Error deleting nurse.");
            console.error(err);
        }
    };

    const handleEditClick = (nurse) => {
        setEditingNurse(nurse);
        setFormData({ ...nurse });
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateNurse(editingNurse.id, formData);
            alert("Nurse updated.");
            setEditingNurse(null);
            fetchNurses();
        } catch (err) {
            alert("Failed to update nurse.");
            console.error(err);
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />
            
            <div className="flex-1 p-8">
                <h1 className="text-3xl font-bold text-blue-900 mb-6">
                    Nurse Management
                </h1>

                {nurses.length > 0 ? (
                    <table className="w-full bg-white rounded shadow-md overflow-hidden">
                        <thead className="bg-blue-100 text-blue-900">
                            <tr>
                                <th className="px-4 py-2 border">Name</th>
                                <th className="px-4 py-2 border">Email</th>
                                <th className="px-4 py-2 border">Phone</th>
                                <th className="px-4 py-2 border">Department</th>
                                <th className="px-4 py-2 border">Doctor</th>
                                <th className="px-4 py-2 border">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {nurses.map((nurse) => (
                                <tr key={nurse.id} className="text-sm">
                                    <td className="px-4 py-2 border">{nurse.name}</td>
                                    <td className="px-4 py-2 border">{nurse.email}</td>
                                    <td className="px-4 py-2 border">{nurse.phone}</td>
                                    <td className="px-4 py-2 border">{nurse.department}</td>
                                    <td className="px-4 py-2 border ">{nurse.assigned_doctor_id}</td>
                                    <td className="px-4 py-2 border space-x-2">
                                        <button
                                            onClick={() => handleEditClick(nurse)}
                                            className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-xs"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(nurse.id)}
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
                    <p className="text-gray-600 italic">No nurses found.</p>
                )}
            </div>

            {/* 🛠 Edit Modal */}
            {editingNurse && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                    <form
                        onSubmit={handleEditSubmit}
                        className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md"
                    >
                        <h2 className="text-xl font-semibold mb-4">Edit Nurse</h2>

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
                                onClick={() => setEditingNurse(null)}
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

export default NurseManagement;
