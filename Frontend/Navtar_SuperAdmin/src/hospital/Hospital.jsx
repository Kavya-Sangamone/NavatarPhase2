import React, { useState, useEffect } from 'react';
import { Building2 } from 'lucide-react';
import AddHospitalModal from './AddHospitalModal';
import HospitalManagement from './HospitalManagement';
import './Hospital.css';
import { fetchHospitals as fetchHospitalsAPI } from '../apis/hospitalApi';
import { fetchNavatars } from '../apis/navatarApi';
import Header from '../Header';

function Hospital() {
  const [hospitals, setHospitals] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchHospitals = async () => {
    try {
      setLoading(true);
      const response = await fetchHospitalsAPI();
      const hospitalsData = response.data;

      const updatedHospitals = await Promise.all(
        hospitalsData.map(async (hospital) => {
          try {
            const navatars = await fetchNavatars();
            const navatarInHospital = navatars.data.filter(
              (navatar) => navatar.hospital_id === hospital.hospital_id
            );
            return {
              ...hospital,
              totalNavatars: navatarInHospital.length,
            };
          } catch (error) {
            console.error(`Error fetching navatars for hospital ${hospital.hospital_id}:`, error);
            return {
              ...hospital,
              totalNavatars: 0,
            };
          }
        })
      );

      setHospitals(updatedHospitals);
    } catch (error) {
      console.error('Error fetching hospitals:', error);
    }
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHospitals();
  }, []);


  return (
    <div className="hospital-container">
      <div className="main-content">
        <Header
          title="Hospitals"
          subtitle="Hospital Management Dashboard"
          Icon={Building2}
          buttonLabel="Add Hospital"
          onButtonClick={() => setShowAddForm(true)}
        />
        <div className="container">
          <div className="hospital">
            {loading ? (
              <div className="loading-indicator">Loading Hospitals...</div>
            ) : (
              <HospitalManagement hospitals={hospitals} fetchHospitals={fetchHospitals} />)}
          </div>

          {showAddForm && (
            <AddHospitalModal
              onClose={() => setShowAddForm(false)}
              fetchHospitals={fetchHospitalsAPI}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Hospital;
