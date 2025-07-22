import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getHospitalById } from '../apis/hospitalApi'; // Assume this exists

function HospitalView() {
  const { id } = useParams();
  const [hospital, setHospital] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHospital = async () => {
      try {
        const data = await getHospitalById(id);
        setHospital(data);
      } catch (error) {
        console.error("Failed to fetch hospital", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHospital();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!hospital) return <p>Hospital not found</p>;

  return (
    <div className="hospital-view">
      <h2>{hospital.hospital_name}</h2>
      <p><strong>Email:</strong> {hospital.contactEmail}</p>
      <p><strong>Country:</strong> {hospital.country}</p>
      <p><strong>Total Navatars:</strong> {hospital.totalNavatars}</p>
      <p><strong>Created:</strong> {new Date(hospital.created_at).toLocaleString()}</p>
    </div>
  );
}

export default HospitalView;
