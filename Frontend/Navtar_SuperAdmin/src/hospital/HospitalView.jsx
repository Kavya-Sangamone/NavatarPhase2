import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getHospitalById } from '../apis/hospitalApi';
import { createAdmin } from '../apis/adminApi';
import './HospitalView.css';
import { createNavatar } from '../apis/navatarApi';

function HospitalView() {
  const { id } = useParams();
  const [hospital, setHospital] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAdminForm, setShowAdminForm] = useState(false);
  const [showNavatarForm,setShowNavatarForm]=useState(false); // ✅ Moved inside component

  useEffect(() => {
    const fetchHospital = async () => {
      try {
        const data = await getHospitalById(id);
        setHospital(data);
        console.log("Fetched hospital object:", data);
      } catch (error) {
        console.error("Error fetching hospital:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHospital();
  }, [id]);

  if (loading) return <div className="loading">Loading...</div>;
  if (!hospital) return <div className="not-found">Hospital not found.</div>;

  return (
    <div className="hospital-container">
      {/* Button Group */}
      <div className="container">
        <div className="d-flex justify-content-end mb-3">
          <button className="btn btn-primary me-2" onClick={() => { console.log("Add Admin clicked"); setShowAdminForm(true) }}>Add Admin</button>
          <button className="btn btn-success" onClick={(setShowNavatarForm)}>Add Navatar</button>
        </div>

        {/* Show Admin Form if button clicked */}
        {showAdminForm && (
          <div className="p-3 border">
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const newAdmin = {
                  admin_name: e.target.name.value,
                   email: e.target.email.value,
                  hospital_id: hospital.hospital_id
                };
                try {
                  console.log("Creating admin:", newAdmin);
                  await createAdmin(newAdmin); // ✅ correct API call
                  alert("Admin created!");
                  setShowAdminForm(false);
                } catch (err) {
                  console.error("❌ Axios 422 Error Response from Backend:", err.response?.data);

                  alert("Failed to create admin: " + JSON.stringify(err.response?.data?.detail || err.message));
                  console.error(err);
                }
              }}
            >
              <h5>Add Admin</h5>
              <div className="mb-2">
                <input className="form-control" name="name" placeholder="Name" required />
              </div>
              <div className="mb-2">
                <input className="form-control" name="email" type="email" placeholder="Email" required />
              </div>
              
              <button type="submit" className="btn btn-success me-2">Create</button>
              <button type="button" className="btn btn-secondary" onClick={() => setShowAdminForm(false)}>Cancel</button>
            </form>
          </div>
        )}
        {showNavatarForm && (
          <div className="p-3 border">
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const newNavtar = {
                  navatar_name: e.target.name.value,
                  hospital_id: hospital.hospital_id
                };
                try {
                  console.log("Creating Navatar:", newNavtar);
                  await createNavatar(newNavtar); // ✅ correct API call
                  alert("Navatar created!");
                  setShowAdminForm(false);
                } catch (err) {
                  alert("Failed to create navatar");
                  console.error(err);
                }
              }}
            >
              <h5>Add Navatar</h5>
              <div className="mb-2">
                <input className="form-control" name="name" placeholder="Name" required />
              </div>
             
              
              <button type="submit" className="btn btn-success me-2">Create</button>
              <button type="button" className="btn btn-secondary" onClick={() => setShowNavatarForm(false)}>Cancel</button>
            </form>
          </div>
        )}

        {/* Hospital Info Card */}
        <div className="card mt-4" style={{ width: '18rem' }}>
          <div className="card-body">
            <h2 className="hospital-name">{hospital.hospital_name}</h2>
            <p><strong>Email:</strong> {hospital.contactEmail}</p>
            <p><strong>Country:</strong> {hospital.country}</p>
            <p><strong>Created:</strong> {new Date(hospital.created_at).toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HospitalView;
