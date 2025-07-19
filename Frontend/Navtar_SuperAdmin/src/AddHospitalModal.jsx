
// import React, { useState } from 'react';
// import countryList from 'react-select-country-list';

// function AddHospitalModal({ show, onClose, fetchHospitals }) {
//   const countries = countryList().getData();

//   const [step, setStep] = useState(1);
//   const [formData, setFormData] = useState({
//     name: '',
//     country: '',
//     pincode: '',
//     email: '',
//     admin_name: '',
//     password:'password@123', // Default password, can be changed later
//   });
//   const [hospitalId, setHospitalId] = useState(null);
//   const [navatarCount, setNavatarCount] = useState(0);
//   const [navatarNames, setNavatarNames] = useState([]);

//   if (!show) return null;

//   const handleHospitalSubmit = async (e) => {
//   e.preventDefault();
//   try {
//     const res = await fetch('http://localhost:8000/superadmin/hospital/create_with_admin', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         hospital: {
//           hospital_name: formData.name,
//           country: formData.country,
//           pincode: formData.pincode
//         },
//         admin: {
//           admin_name: formData.admin_name,
//           email: formData.email,
//           hospital_id: hospitalId, // This will be set after the hospital is created
//           password: 'password@123' // or 'password@123'
//         }
//       }),
//     });

//     if (!res.ok) {
//       const error = await res.json();
//       alert(`Error adding hospital: ${error.detail}`);
//       return;
//     }

//     const hospital = await res.json();
//     setHospitalId(hospital.hospital_id);
//     setStep(2);
//   } catch (err) {
//     alert('Server connection failed.');
//   }
// };


//   const handleNavatarCountSubmit = (e) => {
//     e.preventDefault();
//     const count = parseInt(navatarCount);
//     if (count > 0) {
//       setNavatarNames(Array(count).fill(''));
//       setStep(3);
//     } else {
//       alert('Please enter a valid number.');
//     }
//   };


//  const handleNavatarSubmit = async (e) => {
//   e.preventDefault();
//   try {
//     for (let name of navatarNames) {
//       if (name.trim()) {
//         const res = await fetch(`http://localhost:8000/superadmin/navatars/${hospitalId}`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ navatar_name: name, hospital_id: hospitalId ,}),
        

//       });
//       countries.log(`Adding navatar: ${name} for hospital ID: ${hospitalId}`);

// const responseText = await res.text();  // Capture response body

// if (!res.ok) {
//   console.error(`Status: ${res.status}`);
//   console.error(`Response: ${responseText}`);
//   throw new Error(`Failed to add navatar: ${name}`);
// }

//       }
//     }

//     alert('All Navatars added successfully!');
//     fetchHospitals();
//     setStep(1);
//     setFormData({
//       name: '',
//       country: '',
//       pincode: '',
//       email: '',
//       admin_name: '',
//       password: 'password@123',
//     });
//     setNavatarCount(0);
//     setNavatarNames([]);
//     setHospitalId(null);
//     onClose();
//   } catch (err) {
//     alert('Failed to add navatars.');
//     console.error(err);
//   }
// };


//   const renderStepContent = () => {
//     if (step === 1) {
//       return (
//         <form onSubmit={handleHospitalSubmit} className="space-y-5">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Hospital Name</label>
//             <input
//               type="text"
//               value={formData.name}
//               onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
//             <select
//               value={formData.country}
//               onChange={(e) => setFormData({ ...formData, country: e.target.value })}
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg"
//               required
//             >
//               <option value="">Select country</option>
//               {countries.map((c) => (
//                 <option key={c.value} value={c.label}>{c.label}</option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Pincode / Address</label>
//             <input
//               type="text"
//               value={formData.pincode}
//               onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Admin Email</label>
//             <input
//               type="email"
//               value={formData.email}
//               onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Admin Name</label>
//             <input 
//                type="text"
//                value={formData.admin_name} 
//                 onChange={(e) => setFormData({ ...formData, admin_name: e.target.value })}
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg"
//               required/> 
//               </div>
//           <div className="flex justify-end">
//             <button type="submit" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Next</button>
//           </div>
//         </form>
//       );
//     }

//     if (step === 2) {
//       return (
//         <form onSubmit={handleNavatarCountSubmit} className="space-y-5">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Number of Navatars</label>
//             <input
//               type="number"
//               value={navatarCount}
//               onChange={(e) => setNavatarCount(e.target.value)}
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg"
//               min={1}
//               required
//             />
//           </div>
//           <div className="flex justify-between">
//             <button
//               type="button"
//               onClick={() => setStep(1)}
//               className="px-6 py-3 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
//             >
//               Back
//             </button>
//             <button
//               type="submit"
//               className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//             >
//               Next
//             </button>
//           </div>
//         </form>
//       );
//     }

//     if (step === 3) {
//       return (
//         <form onSubmit={handleNavatarSubmit} className="space-y-4">
//           {navatarNames.map((name, idx) => (
//             <div key={idx}>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Navatar {idx + 1}</label>
//               <input
//                 type="text"
//                 value={name}
//                 onChange={(e) => {
//                   const updated = [...navatarNames];
//                   updated[idx] = e.target.value;
//                   setNavatarNames(updated);
//                 }}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg"
//                 required
//               />
//             </div>
//           ))}
//           <div className="flex justify-between pt-4">
//             <button
//               type="button"
//               onClick={() => setStep(2)}
//               className="px-6 py-3 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
//             >
//               Back
//             </button>
//             <button
//               type="submit"
//               className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
//             >
//               Submit All
//             </button>
//           </div>
//         </form>
//       );
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-xl shadow-xl w-full max-w-lg">
//         <div className="p-6 border-b border-gray-200">
//           <h3 className="text-xl font-semibold text-gray-900">Add New Hospital</h3>
//           <p className="text-sm text-gray-600 mt-1">Step {step} of 3</p>
//         </div>
//         <div className="p-6">{renderStepContent()}</div>
//         <div className="flex justify-end px-6 pb-6">
//           <button
//             type="button"
//             onClick={onClose}
//             className="text-sm text-gray-500 hover:text-gray-700"
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AddHospitalModal;
import React, { useState } from 'react';
import countryList from 'react-select-country-list';

function AddHospitalModal({ show, onClose, fetchHospitals }) {
  const countries = countryList().getData();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    country: '',
    pincode: '',
    email: '',
    admin_name: '',
    password: 'password@123',
  });
  const [hospitalId, setHospitalId] = useState(null);
  const [navatarCount, setNavatarCount] = useState(0);
  const [navatarNames, setNavatarNames] = useState([]);

  if (!show) return null;

  const handleHospitalSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:8000/superadmin/hospital/create_with_admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          hospital: {
            hospital_name: formData.name,
            country: formData.country,
            pincode: formData.pincode
          },
          admin: {
            admin_name: formData.admin_name,
            email: formData.email,
            password: formData.password
          }
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        alert(`Error adding hospital: ${error.detail}`);
        return;
      }

      const response = await res.json();
      console.log("Hospital Creation Response:", response);

      const createdHospitalId = response.admin?.hospital_id;

      if (!createdHospitalId) {
        alert("Hospital creation failed. No hospital_id returned.");
        return;
      }

      setHospitalId(createdHospitalId);
      setStep(2);
    } catch (err) {
      alert('Server connection failed.');
      console.error(err);
    }
  };

  const handleNavatarCountSubmit = (e) => {
    e.preventDefault();
    const count = parseInt(navatarCount);
    if (count > 0) {
      setNavatarNames(Array(count).fill(''));
      setStep(3);
    } else {
      alert('Please enter a valid number.');
    }
  };

  const handleNavatarSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!hospitalId) {
        alert('Hospital ID is missing. Cannot add navatars.');
        return;
      }

      for (let name of navatarNames) {
        if (name.trim()) {
          const res = await fetch(`http://localhost:8000/superadmin/navatars/${hospitalId}/navatars`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ navatar_name: name, hospital_id: hospitalId }),
          });

          console.log(`Adding navatar: ${name} for hospital ID: ${hospitalId}`);

          const responseText = await res.text();
          if (!res.ok) {
            console.error(`Status: ${res.status}`);
            console.error(`Response: ${responseText}`);
            throw new Error(`Failed to add navatar: ${name}`);
          }
        }
      }

      alert('All Navatars added successfully!');
     
      resetForm();
      onClose();
    } catch (err) {
      alert('Failed to add navatars.');
      console.error(err);
    }
  };

  const resetForm = () => {
    setStep(1);
    setFormData({
      name: '',
      country: '',
      pincode: '',
      email: '',
      admin_name: '',
      password: 'password@123',
    });
    setNavatarCount(0);
    setNavatarNames([]);
    setHospitalId(null);
  };

  const renderStepContent = () => {
    if (step === 1) {
      return (
        <form onSubmit={handleHospitalSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Hospital Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
            <select
              value={formData.country}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              required
            >
              <option value="">Select country</option>
              {countries.map((c) => (
                <option key={c.value} value={c.label}>{c.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Pincode / Address</label>
            <input
              type="text"
              value={formData.pincode}
              onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Admin Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Admin Name</label>
            <input 
              type="text"
              value={formData.admin_name} 
              onChange={(e) => setFormData({ ...formData, admin_name: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              required
            /> 
          </div>
          <div className="flex justify-end">
            <button type="submit" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Next</button>
          </div>
        </form>
      );
    }

    if (step === 2) {
      return (
        <form onSubmit={handleNavatarCountSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Number of Navatars</label>
            <input
              type="number"
              value={navatarCount}
              onChange={(e) => setNavatarCount(Number(e.target.value))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              min={1}
              required
            />
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="px-6 py-3 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Back
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Next
            </button>
          </div>
        </form>
      );
    }

    if (step === 3) {
      return (
        <form onSubmit={handleNavatarSubmit} className="space-y-4">
          {navatarNames.map((name, idx) => (
            <div key={idx}>
              <label className="block text-sm font-medium text-gray-700 mb-1">Navatar {idx + 1}</label>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  const updated = [...navatarNames];
                  updated[idx] = e.target.value;
                  setNavatarNames(updated);
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                required
              />
            </div>
          ))}
          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="px-6 py-3 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Back
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Submit All
            </button>
          </div>
        </form>
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900">Add New Hospital</h3>
          <p className="text-sm text-gray-600 mt-1">Step {step} of 3</p>
        </div>
        <div className="p-6">{renderStepContent()}</div>
        <div className="flex justify-end px-6 pb-6">
          <button
            type="button"
            onClick={onClose}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddHospitalModal;
