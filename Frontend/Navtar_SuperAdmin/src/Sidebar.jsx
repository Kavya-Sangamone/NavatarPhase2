import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Building2, Shield, Activity, Bot, Menu } from 'lucide-react';

const Sidebar = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <aside className="sidebar">
            <div className="logo">
                <img
                    src="https://ui-avatars.com/api/?name=Navtar&background=2563eb&color=fff&size=48"
                    alt="Navtar Logo"
                />
                <span>Super Admin</span>
            </div>

            <nav className={`nav-links ${sidebarOpen ? "open" : " "}`}>
                <Link to="/"><div className="nav-item">

                    <Building2 />
                    <span>Hospitals</span>
                </div>
                </Link>
                <Link to="/robots">

                    <div className="nav-item">
                        <Bot />
                        <span>Robots</span>
                    </div>
                </Link>
                <Link to="/security">
                    <div className="nav-item">
                        <Shield />
                        <span>Security</span>
                    </div>
                </Link>
                <Link to="/activity">
                    <div className="nav-item">
                        <Activity />
                        <span>Activity</span>
                    </div>
                </Link>

            </nav>

            <div className="user-profile">
                <button
                    className="hamburger"
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                    <Menu size={40} />
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
