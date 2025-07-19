import React, { useState, useEffect } from 'react';
import { Building2, Plus, Shield, Activity, Bot, TrendingUp } from 'lucide-react';
import countryList from 'react-select-country-list';
import AddHospitalModal from './AddHospitalModal';
import HospitalManagement from './HospitalManagement';
import './Hospital.css';
import { fetchHospitals as fetchHospitalsAPI } from './hospitalApi';
import { getNavatarsByHospital } from '../navatar/navatarApi';
import Sidebar from '../Sidebar';


function Hospital() {
  const [hospitals, setHospitals] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', country: '', pincode: '' });
  const [totalNavatars, setTotalNavatars] = useState(0);

  const fetchHospitals = async () => {
    try {
      const response = await fetchHospitalsAPI();
      const hospitalsData = response.data;

      const updatedHospitals = await Promise.all(
        hospitalsData.map(async (hospital) => {
          try {
            const navatarRes = await getNavatarsByHospital(hospital.hospital_id);
            return {
              ...hospital,
              totalNavatars: navatarRes.data.length,
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

      const total = updatedHospitals.reduce((sum, h) => sum + h.totalNavatars, 0);
      setTotalNavatars(total);

    } catch (error) {
      console.error('Error fetching hospitals:', error);
    }
  };
  useEffect(() => {

    fetchHospitals();
  }, []);


  const countries = countryList().getData();

  const stats = {
    totalHospitals: hospitals.length,
    activeHospitals: hospitals.filter(h => h.status === 'Active').length,
    totalNavatars: totalNavatars,
    newThisMonth: hospitals.filter(h => {
      const created = new Date(h.created_at);
      const now = new Date();
      return created.getMonth() === now.getMonth() && created.getFullYear() === now.getFullYear();
    }).length,
  };

  const StatCard = ({ icon: Icon, title, value, subtitle }) => (
    <div className='stats-card'>
      <div className='stats-card-text'>
        <h3>{title}</h3>
        <p>{value}</p>
        {subtitle && <h4>{subtitle}</h4>}
      </div>
      <div className='stats-card-icon'>
        <Icon />
      </div>
    </div>
  );

  const handleAddHospitalSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.country && formData.pincode) {
      const newHospital = {
        id: Date.now(),
        name: formData.name,
        country: formData.country,
        pincode: formData.pincode,
        status: 'Active',
        totalNavatars: 0,
        accountCreated: new Date().toISOString(),
        location: `${formData.country} - ${formData.pincode}`,
      };
      setHospitals([...hospitals, newHospital]);
      setShowAddForm(false);
      setFormData({ name: '', country: '', pincode: '' });
    }
  };

  return (
    <div className="hospital-container">
      <div className="main-content">
        <header className="header">
          <div className="header-content">
            <div className="header-logo">
              <div className="logo-icon">
                <Shield />
              </div>
              <div className="logo-text">
                <h1>Navtar</h1>
                <p>Hospital Management Dashboard</p>
              </div>
            </div>
            <button onClick={() => setShowAddForm(true)}>
              <Plus />
              Add Hospital
            </button>
          </div>
        </header>
        <div className="container">
          <div className="stats-cards">
            <StatCard
              icon={Building2}
              title="Total Hospitals"
              value={stats.totalHospitals}
              subtitle="Registered facilities"
            />
            <StatCard
              icon={Bot}
              title="Total Navatars"
              value={stats.totalNavatars}
              subtitle="Across all facilities"
            />
            <StatCard
              icon={TrendingUp}
              title="New This Month"
              value={stats.newThisMonth}
              subtitle="Recently added"
            />
          </div>

          <div className="hospital">
            <HospitalManagement hospitals={hospitals} fetchHospitals={fetchHospitals} />
          </div>

          {showAddForm && (
            <AddHospitalModal
              show={showAddForm}
              onClose={() => setShowAddForm(false)}
              onSubmit={handleAddHospitalSubmit}
              formData={formData}
              setFormData={setFormData}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Hospital;
