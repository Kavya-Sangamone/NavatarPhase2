import { Building2, Shield, Activity, Bot } from 'lucide-react';


const Sidebar = () => {
    return (
        <aside className="sidebar">
            <div className="logo">
                <img
                    src="https://ui-avatars.com/api/?name=Navtar&background=2563eb&color=fff&size=48"
                    alt="Navtar Logo"
                />
                <span>Super Admin</span>
            </div>

            <nav className="nav-links">
                <div className="nav-item">
                    <a href="#">
                        <Building2 />
                    </a>
                    Hospitals
                </div>
                <div className="nav-item">

                    <a href="#">
                        <Bot />
                    </a>
                    Robots
                </div>
                <div className="nav-item">
                    <a href="#">
                        <Shield />
                    </a>
                    Security
                </div>
                <div className="nav-item">
                    <a href="#">
                        <Activity />
                    </a>
                    Activity
                </div>
            </nav>

            <div className="user-profile">
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
                <button>Logout</button>
            </div>
        </aside>
    )
}

export default Sidebar;