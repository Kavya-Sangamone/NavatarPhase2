import React, { useState } from 'react';
import countryList from 'react-select-country-list';

function AddHospitalModal({ show, onClose }) {
 const [formData, setFormData] = useState({
  hospital_name: '',
  country: '',
  pincode: '',
});


  const countries = countryList().getData();

  if (!show) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:8080/superadmin/hospital', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        alert(`Error: ${errorData.detail || 'Something went wrong'}`);
      } else {
        alert('Hospital added successfully!');
        await props.fetchHospitals();
        onClose(); // close modal after success
        setFormData({ name: '', country: '', pincode: '' }); // reset form
      }
    } catch (err) {
      alert('Failed to connect to the server.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900">Add New Hospital</h3>
          <p className="text-sm text-gray-600 mt-1">Register a new hospital in the Navtar system</p>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              placeholder="Enter name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
            <select
              value={formData.country}
              onChange={e => setFormData({ ...formData, country: e.target.value, pincode: '' })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              required
            >
              <option value="">Select country</option>
              {countries.map(c => (
                <option key={c.value} value={c.label}>{c.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <input
              type="text"
              value={formData.pincode}
              onChange={e => setFormData({ ...formData, pincode: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              placeholder={`Enter  Address`}
              required
            />
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddHospitalModal;
