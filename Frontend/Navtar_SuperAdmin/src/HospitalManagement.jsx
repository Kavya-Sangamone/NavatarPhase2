import React, { useEffect, useState } from 'react';
import axios from 'axios';

function HospitalManagement() {
  const [hospitals, setHospitals] = useState([]);

  const fetchHospitals = async () => {
    try {
      const response = await axios.get('http://localhost:8080/superadmin/hospital/');
      setHospitals(response.data);
    } catch (error) {
      console.error('Error fetching hospitals:', error);
    }
  };

  useEffect(() => {
    fetchHospitals();
  }, []);
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">All Hospitals</h2>
      <table className="min-w-full bg-white border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Hospital Name</th>
            <th className="border px-4 py-2">Country</th>
            <th className="border px-4 py-2">Pincode</th>
            <th className="border px-4 py-2">Created At</th>
            <th className="border px-4 py-2">Updated At</th>
          </tr>
        </thead>
        <tbody>
          {hospitals.map((hospital) => (
            <tr key={hospital.hospital_id}>
              <td className="border px-4 py-2">{hospital.hospital_name || hospital.name || 'N/A'}</td>

              
              <td className="border px-4 py-2">{hospital.country}</td>
              <td className="border px-4 py-2">{hospital.pincode}</td>
              <td className="border px-4 py-2">{new Date(hospital.created_at).toLocaleString()}</td>
              <td className="border px-4 py-2">{new Date(hospital.updated_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default HospitalManagement;
