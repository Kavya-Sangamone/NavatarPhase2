// import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { getNavatarsByHospital, updateNavatar } from "../apis/navatarApis";
import React, { useEffect, useState } from "react";
import "../index.css";

const locationOptions = [
  "Room 1",
  "Room 2",
  "Room 3",
  "Ward A",
  "ICU",
  "Operation Theater",
];

const NavtarManagement = () => {
  const admin = JSON.parse(localStorage.getItem("admin"));
  const [navtars, setNavtars] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [updatedLocation, setUpdatedLocation] = useState({});

  useEffect(() => {
    if (admin?.hospital_id) {
      fetchNavtars();
    }
  }, [admin?.hospital_id]);

  const fetchNavtars = () => {
    getNavatarsByHospital(admin.hospital_id).then((res) => {
      setNavtars(res.data);
    });
  };

  const handleEdit = (id, currentLocation) => {
    setEditingId(id);
    setUpdatedLocation((prev) => ({ ...prev, [id]: currentLocation || "" }));
  };

  const handleSave = (id) => {
    const newLocation = updatedLocation[id];
    const navatarToUpdate = navtars.find((n) => n.navatar_id === id);

    updateNavatar(id, {
      navatar_name: navatarToUpdate.navatar_name,
      location: newLocation,
      hospital_id: admin.hospital_id,
      status: "Available",
    }).then(() => {
      setEditingId(null);
      fetchNavtars(); // refresh data
    });
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-10">
        <h1 className="text-3xl font-bold text-blue-900 mb-6">
          Navtar Management
        </h1>
        <table className="w-full border text-sm">
          <thead className="bg-gray-200">
            <tr>
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Location</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {navtars.map((nav) => (
              <tr key={nav.navatar_id}>
                <td className="border px-4 py-2">{nav.navatar_id}</td>
                <td className="border px-4 py-2">{nav.navatar_name}</td>
                <td className="border px-4 py-2">
                  {editingId === nav.navatar_id ? (
                    <select
                      className="border p-1 rounded"
                      value={updatedLocation[nav.navatar_id] || ""}
                      onChange={(e) =>
                        setUpdatedLocation({
                          ...updatedLocation,
                          [nav.navatar_id]: e.target.value,
                        })
                      }
                    >
                      <option value="">Select Location</option>
                      {locationOptions.map((loc) => (
                        <option key={loc} value={loc}>
                          {loc}
                        </option>
                      ))}
                    </select>
                  ) : (
                    nav.location || "Not Assigned"
                  )}
                </td>
                <td className="border px-4 py-2">{nav.status || "Offline"}</td>
                <td className="border px-4 py-2 space-x-2">
                  {editingId === nav.navatar_id ? (
                    <>
                      <button
                        className="bg-green-600 text-white px-2 py-1 rounded"
                        onClick={() => handleSave(nav.navatar_id)}
                      >
                        Save
                      </button>
                      <button
                        className="bg-gray-500 text-white px-2 py-1 rounded"
                        onClick={handleCancel}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      className={`${
                        nav.location
                          ? "bg-blue-600"
                          : "bg-yellow-500"
                      } text-white px-2 py-1 rounded`}
                      onClick={() =>
                        handleEdit(nav.navatar_id, nav.location)
                      }
                    >
                      {nav.location ? "Update Location" : "Set Location"}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NavtarManagement;
