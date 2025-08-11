// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { getHospitalById } from '../apis/hospitalApi';
// import { createAdmin, getAdmins } from '../apis/adminApi';
// import { createNavatar, get_navatars_by_hospital } from '../apis/navatarApi';
// import './HospitalView.css';
// import { FaUserPlus, FaRobot } from 'react-icons/fa'; // Add react-icons for better buttons

// function HospitalView() {
//   const { id } = useParams();
//   const [hospital, setHospital] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [admins, setAdmins] = useState([]);
//   const [navatars, setNavatars] = useState([]);
//   const [showAdminForm, setShowAdminForm] = useState(false);
//   const [showNavatarForm, setShowNavatarForm] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const hospitalData = await getHospitalById(id);
//         setHospital(hospitalData);

//         const adminsData = await getAdmins(id);
//         setAdmins(Array.isArray(adminsData) ? adminsData : adminsData && typeof adminsData === 'object' ? [adminsData] : []);

//         const navatarsData = await get_navatars_by_hospital(id);
//         setNavatars(Array.isArray(navatarsData) ? navatarsData : []);
//       } catch (error) {
//         setAdmins([]);
//         setNavatars([]);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, [id]);

//   const refreshAdmins = async () => {
//     try {
//       const adminsData = await getAdmins(id);
//       setAdmins(Array.isArray(adminsData) ? adminsData : adminsData && typeof adminsData === 'object' ? [adminsData] : []);
//     } catch {
//       setAdmins([]);
//     }
//   };

//   const refreshNavatars = async () => {
//     try {
//       const navatarsData = await get_navatars_by_hospital(id);
//       setNavatars(Array.isArray(navatarsData) ? navatarsData : []);
//     } catch {
//       setNavatars([]);
//     }
//   };

//   if (loading) return <div className="loading">Loading...</div>;
//   if (!hospital) return <div className="not-found">Hospital not found.</div>;

//   return (
//     <div className="hospital-container container my-5">
//       <header className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
//         <h1 className="hospital-title">{hospital.hospital_name}</h1>
//         <div className="button-group d-flex gap-3 flex-wrap">
//           <button
//             className="btn btn-primary btn-lg d-flex align-items-center gap-2"
//             onClick={() => setShowAdminForm(true)}
//             aria-label="Add Admin"
//           >
//             <FaUserPlus /> Add Admin
//           </button>
//           <button
//             className="btn btn-success btn-lg d-flex align-items-center gap-2"
//             onClick={() => setShowNavatarForm(true)}
//             aria-label="Add Navatar"
//           >
//             <FaRobot /> Add Navatar
//           </button>
//         </div>
//       </header>

//       {/* Admin Form */}
//       {showAdminForm && (
//         <section className="card mb-5 shadow-sm border-0 p-4 admin-form">
//           <h5 className="mb-3 text-primary fw-semibold">Add Admin</h5>
//           <form
//             onSubmit={async (e) => {
//               e.preventDefault();
//               const newAdmin = {
//                 admin_name: e.target.name.value.trim(),
//                 email: e.target.email.value.trim(),
//                 hospital_id: hospital.hospital_id,
//               };
//               try {
//                 await createAdmin(newAdmin);
//                 alert("Admin created!");
//                 setShowAdminForm(false);
//                 refreshAdmins();
//               } catch (err) {
//                 alert(
//                   "Failed to create admin: " +
//                     JSON.stringify(err.response?.data?.detail || err.message)
//                 );
//               }
//             }}
//           >
//             <div className="form-group mb-3">
//               <input
//                 className="form-control form-control-lg"
//                 name="name"
//                 placeholder="Name"
//                 required
//                 autoFocus
//               />
//             </div>
//             <div className="form-group mb-4">
//               <input
//                 className="form-control form-control-lg"
//                 name="email"
//                 type="email"
//                 placeholder="Email"
//                 required
//               />
//             </div>
//             <div className="d-flex gap-3 flex-wrap">
//               <button type="submit" className="btn btn-success btn-lg px-4">
//                 Create
//               </button>
//               <button
//                 type="button"
//                 className="btn btn-outline-secondary btn-lg px-4"
//                 onClick={() => setShowAdminForm(false)}
//               >
//                 Cancel
//               </button>
//             </div>
//           </form>
//         </section>
//       )}

//       {/* Navatar Form */}
//       {showNavatarForm && (
//         <section className="card mb-5 shadow-sm border-0 p-4 navatar-form">
//           <h5 className="mb-3 text-success fw-semibold">Add Navatar</h5>
//           <form
//             onSubmit={async (e) => {
//               e.preventDefault();
//               const newNavatar = {
//                 navatar_name: e.target.name.value.trim(),
//                 hospital_id: hospital.hospital_id,
//               };
//               try {
//                 await createNavatar(newNavatar);
//                 alert("Navatar created!");
//                 setShowNavatarForm(false);
//                 refreshNavatars();
//               } catch {
//                 alert("Failed to create navatar");
//               }
//             }}
//           >
//             <div className="form-group mb-4">
//               <input
//                 className="form-control form-control-lg"
//                 name="name"
//                 placeholder="Name"
//                 required
//                 autoFocus
//               />
//             </div>
//             <div className="d-flex gap-3 flex-wrap">
//               <button type="submit" className="btn btn-success btn-lg px-4">
//                 Create
//               </button>
//               <button
//                 type="button"
//                 className="btn btn-outline-secondary btn-lg px-4"
//                 onClick={() => setShowNavatarForm(false)}
//               >
//                 Cancel
//               </button>
//             </div>
//           </form>
//         </section>
//       )}

//       {/* Hospital Details */}
//       <section className="card mb-5 shadow-lg border-0 hospital-details-card p-4">
//         <header className="card-header bg-primary text-white rounded-top">
//           <h5 className="mb-0 fw-semibold">Hospital Details</h5>
//         </header>
//         <div className="card-body pt-3">
//           <p><strong>Email:</strong> {hospital.contactEmail || 'N/A'}</p>
//           <p><strong>Country:</strong> {hospital.country}</p>
//           <p><strong>Pincode:</strong> {hospital.pincode}</p>
//           <p>
//             <strong>Created:</strong>{" "}
//             {new Date(hospital.created_at).toLocaleString()}
//           </p>
//         </div>
//       </section>

//       {/* Admins Section */}
//       <section className="mb-5">
//         <h3 className="mb-3 fw-semibold text-primary">Admins</h3>
//         {!admins.length ? (
//           <p className="text-muted fst-italic">No admins found for this hospital.</p>
//         ) : (
//           <div className="card shadow-sm border-0 admin-table-card">
//             <div className="card-body p-0">
//               <table className="table table-striped table-hover mb-0">
//                 <thead className="table-primary">
//                   <tr>
//                     <th>Name</th>
//                     <th>Email</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {admins.map((admin) => (
//                     <tr key={admin.admin_id || admin.id || admin.email}>
//                       <td>{admin.admin_name || admin.name || 'N/A'}</td>
//                       <td>{admin.email || 'N/A'}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}
//       </section>

//       {/* Navatars Section */}
//       <section>
//         <h3 className="mb-3 fw-semibold text-success">Navatars</h3>
//         {!navatars.length ? (
//           <p className="text-muted fst-italic">No navatars found for this hospital.</p>
//         ) : (
//           <div className="card shadow-sm border-0 navatar-table-card">
//             <div className="card-body p-0">
//               <table className="table table-striped table-hover mb-0">
//                 <thead className="table-success">
//                   <tr>
//                     <th>Name</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {navatars.map((navatar) => (
//                     <tr key={navatar.navatar_id || navatar.id}>
//                       <td>{navatar.navatar_name || navatar.name || 'N/A'}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}
//       </section>
//     </div>
//   );
// }

// export default HospitalView;
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Trash2, Plus, User, Building2, Mail, MapPin, Calendar, Users, Bot } from 'lucide-react';
import { getHospitalById } from '../apis/hospitalApi';
import { createAdmin, getAdmins, deleteAdmin } from '../apis/adminApi';
import { createNavatar, get_navatars_by_hospital } from '../apis/navatarApi';
import './HospitalView.css';

function HospitalView() {
  const { id } = useParams();
  const [hospital, setHospital] = useState(null);
  const [loading, setLoading] = useState(true);
  const [admins, setAdmins] = useState([]);
  const [navatars, setNavatars] = useState([]);
  const [showAdminForm, setShowAdminForm] = useState(false);
  const [showNavatarForm, setShowNavatarForm] = useState(false);
  const [deletingAdminId, setDeletingAdminId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const hospitalData = await getHospitalById(id);
        console.log(id)
        console.log('Fetched hospital:', hospitalData);
        setHospital(hospitalData);

        const adminsData = await getAdmins(id);
        console.log('Fetched admins:', adminsData);
        setAdmins(Array.isArray(adminsData) ? adminsData : adminsData && typeof adminsData === 'object' ? [adminsData] : []);

        const navatarsData = await get_navatars_by_hospital(id);
        console.log('Fetched navatars:', navatarsData);
        setNavatars(Array.isArray(navatarsData) ? navatarsData : []);
      } catch (error) {
        console.error("Error fetching hospital or related data:", error);
        setAdmins([]);
        setNavatars([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const refreshAdmins = async () => {
    try {
      const adminsData = await getAdmins(id);
      console.log('Refreshed admins:', adminsData);
      setAdmins(Array.isArray(adminsData) ? adminsData : adminsData && typeof adminsData === 'object' ? [adminsData] : []);
    } catch (err) {
      console.error("Failed to refresh admins:", err);
      setAdmins([]);
    }
  };

  const refreshNavatars = async () => {
    try {
      const navatarsData = await get_navatars_by_hospital(id);
      console.log('Refreshed navatars:', navatarsData);
      setNavatars(Array.isArray(navatarsData) ? navatarsData : []);
    } catch (err) {
      console.error("Failed to refresh navatars:", err);
      setNavatars([]);
    }
  };

  const handleDeleteAdmin = async (adminId) => {
    if (!window.confirm('Are you sure you want to delete this admin?')) {
      return;
    }

    setDeletingAdminId(adminId);
    try {
      // Replace this with your actual deleteAdmin API call
      // await deleteAdmin(adminId);
      console.log('Deleting admin:', adminId);
      
      // For demo purposes, remove from local state
      setAdmins(admins.filter(admin => (admin.admin_id || admin.id) !== adminId));
      
      // Uncomment this when you have the actual API
      // await refreshAdmins();
    } catch (error) {
      console.error('Failed to delete admin:', error);
      alert('Failed to delete admin. Please try again.');
    } finally {
      setDeletingAdminId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="text-gray-600 font-medium">Loading hospital details...</p>
        </div>
      </div>
    );
  }

  if (!hospital) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Building2 className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Hospital not found</h3>
          <p className="text-gray-500">The requested hospital could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 p-3 rounded-xl">
                <Building2 className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{hospital.hospital_name}</h1>
                <p className="text-gray-500 mt-1">Hospital Management Dashboard</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
              <button
                onClick={() => setShowAdminForm(true)}
                className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add Admin
              </button>
              <button
                onClick={() => setShowNavatarForm(true)}
                className="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add Navatar
              </button>
            </div>
          </div>
        </div>

        {/* Admin Form */}
        {showAdminForm && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-8 animate-in slide-in-from-top duration-300">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-blue-100 p-2 rounded-lg">
                <User className="h-6 w-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Add New Admin</h2>
            </div>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const newAdmin = {
                  admin_name: e.target.name.value,
                  email: e.target.email.value,
                  hospital_id: hospital.hospital_id,
                };
                try {
                  await createAdmin(newAdmin);
                  alert("Admin created successfully!");
                  setShowAdminForm(false);
                  refreshAdmins();
                } catch (err) {
                  alert(
                    "Failed to create admin: " +
                      JSON.stringify(err.response?.data?.detail || err.message)
                  );
                  console.error(err);
                }
              }}
              className="space-y-6"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  name="name"
                  placeholder="Enter admin name"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  name="email"
                  type="email"
                  placeholder="Enter email address"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>
              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-xl transition-colors"
                >
                  Create Admin
                </button>
                <button
                  type="button"
                  onClick={() => setShowAdminForm(false)}
                  className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-medium py-3 px-6 rounded-xl transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Navatar Form */}
        {showNavatarForm && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-8 animate-in slide-in-from-top duration-300">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-green-100 p-2 rounded-lg">
                <Bot className="h-6 w-6 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Add New Navatar</h2>
            </div>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const newNavatar = {
                  navatar_name: e.target.name.value,
                  hospital_id: hospital.hospital_id,
                };
                try {
                  await createNavatar(newNavatar);
                  alert("Navatar created successfully!");
                  setShowNavatarForm(false);
                  refreshNavatars();
                } catch (err) {
                  alert("Failed to create navatar");
                  console.error(err);
                }
              }}
              className="space-y-6"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  name="name"
                  placeholder="Enter navatar name"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                />
              </div>
              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-xl transition-colors"
                >
                  Create Navatar
                </button>
                <button
                  type="button"
                  onClick={() => setShowNavatarForm(false)}
                  className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-medium py-3 px-6 rounded-xl transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Hospital Details Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
            <h2 className="text-2xl font-bold text-white">Hospital Details</h2>
          </div>
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Mail className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Email</p>
                  <p className="text-gray-900 font-semibold">{hospital.contactEmail || 'N/A'}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-green-100 p-2 rounded-lg">
                  <MapPin className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Country</p>
                  <p className="text-gray-900 font-semibold">{hospital.country}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <MapPin className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Pincode</p>
                  <p className="text-gray-900 font-semibold">{hospital.pincode}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-orange-100 p-2 rounded-lg">
                  <Calendar className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Created</p>
                  <p className="text-gray-900 font-semibold">{new Date(hospital.created_at).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Admins Section */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 px-8 py-6">
              <div className="flex items-center space-x-3">
                <Users className="h-6 w-6 text-white" />
                <h2 className="text-2xl font-bold text-white">Admins ({admins.length})</h2>
              </div>
            </div>
            <div className="p-8">
              {!Array.isArray(admins) || admins.length === 0 ? (
                <div className="text-center py-12">
                  <Users className="mx-auto h-16 w-16 text-gray-300 mb-4" />
                  <p className="text-gray-500 text-lg">No admins found for this hospital</p>
                  <p className="text-gray-400 text-sm mt-2">Click "Add Admin" to get started</p>
                </div>
              ) : (
                <div className="overflow-hidden rounded-xl border border-gray-200">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {admins.map((admin) => {
                        const adminId = admin.admin_id || admin.id || admin.email;
                        return (
                          <tr key={adminId} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="bg-indigo-100 p-2 rounded-lg mr-3">
                                  <User className="h-4 w-4 text-indigo-600" />
                                </div>
                                <span className="text-sm font-medium text-gray-900">
                                  {admin.admin_name || admin.name || 'N/A'}
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <Mail className="h-4 w-4 text-gray-400 mr-2" />
                                <span className="text-sm text-gray-600">{admin.email || 'N/A'}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <button
                                onClick={() => handleDeleteAdmin(adminId)}
                                disabled={deletingAdminId === adminId}
                                className="inline-flex items-center px-3 py-2 bg-red-100 hover:bg-red-200 text-red-700 text-sm font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                {deletingAdminId === adminId ? (
                                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600 mr-2"></div>
                                ) : (
                                  <Trash2 className="h-4 w-4 mr-2" />
                                )}
                                {deletingAdminId === adminId ? 'Deleting...' : 'Delete'}
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Navatars Section */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-green-600 to-green-700 px-8 py-6">
              <div className="flex items-center space-x-3">
                <Bot className="h-6 w-6 text-white" />
                <h2 className="text-2xl font-bold text-white">Navatars ({navatars.length})</h2>
              </div>
            </div>
            <div className="p-8">
              {!Array.isArray(navatars) || navatars.length === 0 ? (
                <div className="text-center py-12">
                  <Bot className="mx-auto h-16 w-16 text-gray-300 mb-4" />
                  <p className="text-gray-500 text-lg">No navatars found for this hospital</p>
                  <p className="text-gray-400 text-sm mt-2">Click "Add Navatar" to get started</p>
                </div>
              ) : (
                <div className="overflow-hidden rounded-xl border border-gray-200">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {navatars.map((navatar) => (
        <tr key={navatar.navatar_id || navatar.id} className="hover:bg-gray-50 transition-colors">
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="flex items-center">
              <div className="bg-green-100 p-2 rounded-lg mr-3">
                <Bot className="h-4 w-4 text-green-600" />
              </div>
              <span className="text-sm font-medium text-gray-900">
                {navatar.navatar_name || navatar.name || 'N/A'}
              </span>
            </div>
          </td>
        </tr>
      ))}
                          </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HospitalView;