import React, { useState } from 'react';
import { Building2, Plus, Shield, Activity, Search, Edit3, Trash2, Eye, Bot, Calendar, TrendingUp, MapPin, Sidebar } from 'lucide-react';
import countryList from 'react-select-country-list'; // Install with: npm install react-select-country-list
import AddHospitalModal from './AddHospitalModal';
import HospitalManagement from './HospitalManagement';

function App() {
  const [hospitals, setHospitals] = useState([
    {
      id: '1',
      name: 'City General Hospital',
      location: 'New York, NY',
      accountCreated: '2024-03-15',
      totalRobots: 12,
      status: 'Active',
      contactEmail: 'admin@citygeneral.com',
      lastActivity: '2025-01-27 14:30'
    },
    {
      id: '2',
      name: 'St. Mary Medical Center',
      location: 'Los Angeles, CA',
      accountCreated: '2024-05-22',
      totalRobots: 8,
      status: 'Active',
      contactEmail: 'tech@stmary.com',
      lastActivity: '2025-01-27 12:15'
    },
    {
      id: '3',
      name: 'Regional Health System',
      location: 'Chicago, IL',
      accountCreated: '2024-07-10',
      totalRobots: 15,
      status: 'Active',
      contactEmail: 'support@regional.com',
      lastActivity: '2025-01-26 16:45'
    },
    {
      id: '4',
      name: 'Metro Emergency Center',
      location: 'Houston, TX',
      accountCreated: '2024-09-03',
      totalRobots: 6,
      status: 'Inactive',
      contactEmail: 'info@metro.com',
      lastActivity: '2025-01-25 09:20'
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

 

  const [formData, setFormData] = useState({
    name: '',
    country: '',
    pincode: ''
  });

  const countries = countryList().getData();

  const stats = {
    totalHospitals: hospitals.length,
    activeHospitals: hospitals.filter(hospital => hospital.status === 'Active').length,
    totalRobots: hospitals.reduce((sum, hospital) => sum + hospital.totalRobots, 0),
    newThisMonth: hospitals.filter(hospital => {
      const created = new Date(hospital.accountCreated);
      const now = new Date();
      return created.getMonth() === now.getMonth() && created.getFullYear() === now.getFullYear();
    }).length
  };

  const filteredHospitals = hospitals.filter(hospital => {
    const matchesSearch = hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hospital.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || hospital.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  

  const handleDeleteHospital = (id) => {
    if (window.confirm('Are you sure you want to remove this hospital?')) {
      setHospitals(hospitals.filter(hospital => hospital.id !== id));
    }
  };

  const toggleHospitalStatus = (id) => {
    setHospitals(hospitals.map(hospital => 
      hospital.id === id 
        ? { ...hospital, status: hospital.status === 'Active' ? 'Inactive' : 'Active' }
        : hospital
    ));
  };

  const StatCard = ({ icon: Icon, title, value, subtitle, color }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
          {subtitle && (
            <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="w-7 h-7 text-white" />
        </div>
      </div>
    </div>
  );

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleAddHospitalSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.country && formData.pincode) {
      // Add hospital logic here if needed
      setShowAddForm(false);
      setFormData({ name: '', country: '', pincode: '' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col py-8 px-4 shadow-lg">
        {/* Logo & Title */}
        <div className="flex items-center mb-12">
          <img
            src="https://ui-avatars.com/api/?name=Navtar&background=2563eb&color=fff&size=48"
            alt="Navtar Logo"
            className="w-10 h-10 rounded-full mr-3"
          />
          <span className="text-2xl font-bold text-blue-700 tracking-tight">Navtar Super Admin</span>
        </div>
        {/* Navigation */}
        <nav className="flex-1">
          <div className="mb-6">
            <p className="text-xs font-semibold text-gray-400 uppercase mb-2 pl-2">Main</p>
            <a href="#" className="flex items-center px-4 py-3 rounded-lg text-blue-700 bg-blue-50 font-semibold transition hover:bg-blue-100">
              <Building2 className="w-5 h-5 mr-3" />
              Hospitals
            </a>
            <a href="#" className="flex items-center px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-700 font-medium transition">
              <Bot className="w-5 h-5 mr-3" />
              Robots
            </a>
            <a href="#" className="flex items-center px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-700 font-medium transition">
              <Shield className="w-5 h-5 mr-3" />
              Security
            </a>
            <a href="#" className="flex items-center px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-700 font-medium transition">
              <Activity className="w-5 h-5 mr-3" />
              Activity
            </a>
          </div>
        </nav>
        {/* User Profile & Logout */}
        <div className="mt-auto pt-8 border-t border-gray-100">
          <div className="flex items-center mb-4 px-2">
            <img
              src="https://ui-avatars.com/api/?name=Admin&background=6366f1&color=fff&size=32"
              alt="Admin"
              className="w-8 h-8 rounded-full mr-2"
            />
            <div>
              <p className="text-sm font-semibold text-gray-900">Super Admin</p>
              <p className="text-xs text-gray-500">admin@navtar.com</p>
            </div>
          </div>
          <button className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition">
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Navtar</h1>
                  <p className="text-sm text-gray-600">Hospital Management Dashboard</p>
                </div>
              </div>
              <button
                onClick={() => setShowAddForm(true)}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Hospital
              </button>
            </div>
          </div>
        </header>
        <div className="px-6 py-8">
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              icon={Building2}
              title="Total Hospitals"
              value={stats.totalHospitals}
              subtitle="Registered facilities"
              color="bg-blue-600"
            />
            <StatCard
              icon={Activity}
              title="Active Hospitals"
              value={stats.activeHospitals}
              subtitle="Currently operational"
              color="bg-green-600"
            />
            <StatCard
              icon={Bot}
              title="Total Robots"
              value={stats.totalRobots}
              subtitle="Across all facilities"
              color="bg-purple-600"
            />
            <StatCard
              icon={TrendingUp}
              title="New This Month"
              value={stats.newThisMonth}
              subtitle="Recently added"
              color="bg-indigo-600"
            />
          </div>

          {/* Hospital Management */}
          {/* <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                <h2 className="text-xl font-semibold text-gray-900">Hospital Management</h2>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search hospitals..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
                    />
                  </div>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="All">All Status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hospital</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account Created</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Robots</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredHospitals.map((hospital) => (
                    <tr key={hospital.id} className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Building2 className="w-5 h-5 text-blue-600" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{hospital.name}</div>
                            <div className="text-sm text-gray-500">{hospital.contactEmail}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-900">
                          <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                          {hospital.location}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-900">
                          <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                          {formatDate(hospital.accountCreated)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Bot className="w-4 h-4 mr-2 text-purple-600" />
                          <span className="text-lg font-semibold text-gray-900">{hospital.totalRobots}</span>
                          <span className="text-sm text-gray-500 ml-1">robots</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                          hospital.status === 'Active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {hospital.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => toggleHospitalStatus(hospital.id)}
                            className="text-blue-600 hover:text-blue-800 transition-colors duration-150"
                            title="Toggle Status"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button 
                            className="text-gray-600 hover:text-gray-800 transition-colors duration-150"
                            title="Edit Hospital"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteHospital(hospital.id)}
                            className="text-red-600 hover:text-red-800 transition-colors duration-150"
                            title="Delete Hospital"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredHospitals.length === 0 && (
              <div className="text-center py-12">
                <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No hospitals found matching your criteria</p>
              </div>
            )}
          </div> */}

        <HospitalManagement/>
        </div>

        {/* Add Hospital Modal */}
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
  );
}

export default App;

