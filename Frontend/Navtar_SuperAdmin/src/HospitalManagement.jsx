import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Search,
  Building2,
  MapPin,
  Calendar,
  Bot,
  Eye,
  Edit3,
  Trash2,
} from "lucide-react";

const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString();

function HospitalManagement() {
  const [hospitals, setHospitals] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  useEffect(() => {
    axios
      .get("http://localhost:8000/hospital-navatar-summary")
      .then((res) => {
        const enrichedData = res.data.map((item, index) => ({
          id: index + 1,
          name: item.hospital_name,
          contactEmail: item.admin_email,
          location: item.pincode,
          accountCreated: new Date(), // If needed, replace with real date field
          totalRobots: item.navatar_count,
          status: item.navatar_count > 0 ? "Active" : "Inactive",
        }));
        setHospitals(enrichedData);
      })
      .catch((err) => {
        console.error("Error fetching hospitals:", err);
      });
  }, []);

  const filteredHospitals = hospitals.filter((h) => {
    const matchesSearch = h.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "All" || h.status === filterStatus;
    return matchesSearch && matchesStatus;
  });
  const handleDelete = async (hospital_id) => {
    if (!window.confirm("Are you sure you want to delete this hospital?")) return;

    try {
      await axios.delete(`http://localhost:8000/superadmin/hospital/${hospital_id}`);
      alert("Hospital deleted successfully");
      fetchHospitals(); // Refresh the hospital list
    } catch (err) {
      alert("Delete failed: " + err.response?.data?.detail || err.message);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Hospital Management</h2>

      <div className="flex items-center mb-4 space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search hospitals..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border rounded-lg w-full"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border rounded-lg py-2 px-3"
        >
          <option value="All">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-200 rounded-lg">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2 text-left">#</th>
              <th className="px-4 py-2 text-left"><Building2 className="inline-block mr-2" />Hospital Name</th>
              <th className="px-4 py-2 text-left"><MapPin className="inline-block mr-2" />Pincode</th>
              <th className="px-4 py-2 text-left"><Calendar className="inline-block mr-2" />Created</th>
              <th className="px-4 py-2 text-left"><Bot className="inline-block mr-2" />Navatars</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredHospitals.map((hospital, index) => (
              <tr key={hospital.id} className="border-t">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">
                  <div className="font-semibold">{hospital.name}</div>
                  <div className="text-sm text-gray-500">{hospital.contactEmail}</div>
                </td>
                <td className="px-4 py-2">{hospital.location}</td>
                <td className="px-4 py-2">{formatDate(hospital.accountCreated)}</td>
                <td className="px-4 py-2">{hospital.totalRobots}</td>
                <td className="px-4 py-2">
                  <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                    hospital.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                  }`}>
                    {hospital.status}
                  </span>
                </td>
                <td className="px-4 py-2 space-x-2">
                  <button className="text-blue-500 hover:text-blue-700">
                    <Eye size={18} />
                  </button>
                  <button className="text-yellow-500 hover:text-yellow-700">
                    <Edit3 size={18} />
                  </button>
                
                </td>
              </tr>
            ))}
            {filteredHospitals.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500">
                  No hospitals found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default HospitalManagement;
