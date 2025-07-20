import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Building2, Shield, Activity, Bot, Menu, X } from 'lucide-react';

const Sidebar = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const linkStyle = ({ isActive }) => ({
        color: isActive ? '#2828cd' : '#333',
        borderBottom: isActive ? '2px solid currentColor' : 'none',
    });

    return (
        <aside className="sidebar">
            <div className="logo">
                <img
                    src="https://ui-avatars.com/api/?name=Navtar&background=2563eb&color=fff&size=48"
                    alt="Navtar Logo"
                />
                <span>Super Admin</span>
            </div>

            <nav className={`nav-links ${sidebarOpen ? "open" : ""}`}>
                <NavLink to="/" style={linkStyle}>
                    <div className="nav-item">
                        <Activity />
                        <span>Activity</span>
                    </div>
                </NavLink>
                <NavLink to="/hospitals" style={linkStyle}>
                    <div className="nav-item">
                        <Building2 />
                        <span>Hospitals</span>
                    </div>
                </NavLink>
                <NavLink to="/navatars" style={linkStyle}>
                    <div className="nav-item">
                        <Bot />
                        <span>Navatars</span>
                    </div>
                </NavLink>
                <NavLink to="/security" style={linkStyle}>
                    <div className="nav-item">
                        <Shield />
                        <span>Security</span>
                    </div>
                </NavLink>

            </nav>

            <div className="user-profile">
                <button
                    className="hamburger"
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                    {!sidebarOpen ? <Menu size={40} /> : <X size={40} />}
                </button>
                <div className="profile-info">
                    <img
                        src="https://ui-avatars.com/api/?name=Admin&background=6366f1&color=fff&size=32"
                        alt="Admin"
                    />
                    <div className="profile-details">
                        <span>Super Admin</span>
                        <p>admin@navtar.com</p>
                    </div>
                </div>
                <button className='logout'>Logout</button>
            </div>
        </aside>
    );
};

export default Sidebar;
