import { useState, useEffect } from 'react';
import { Building2, Bot, TrendingUp, Activity } from 'lucide-react';
import { fetchHospitals as fetchHospitalsAPI } from '../apis/hospitalApi';
import { fetchNavatars } from '../apis/navatarApi';
import Header from '../Header';

const Activities = () => {
    const [hospitals, setHospitals] = useState([]);
    const [totalBuilt, setTotalBuilt] = useState(0);
    const [totalAssigned, setTotalAssigned] = useState(0);

    const fetchHospitals = async () => {
        try {
            const [hospitalResponse, navatarResponse] = await Promise.all([
                fetchHospitalsAPI(),
                fetchNavatars(),
            ]);

            setHospitals(hospitalResponse.data);

            const navatars = navatarResponse.data;
            setTotalBuilt(navatars.length);
            setTotalAssigned(navatars.filter((n) => n.hospital_id !== null).length);
        } catch (error) {
            console.error('Error fetching activities data:', error);
        }
    };

    useEffect(() => {
        fetchHospitals();
    }, []);

    const StatCard = ({ icon: Icon, title, value, subtitle }) => {
        const [count, setCount] = useState(0);

        useEffect(() => {
            let start = 0;
            const duration = 1000;
            const stepTime = Math.max(Math.floor(duration / value), 10);
            const interval = setInterval(() => {
                start += 1;
                setCount((prev) => (prev < value ? start : value));
                if (start >= value) clearInterval(interval);
            }, stepTime);
            return () => clearInterval(interval);
        }, [value]);

        return (
            <div className="stats-card">
                <div className="stats-card-text">
                    <h3>{title}</h3>
                    <p>{count}</p>
                    {subtitle && <h4>{subtitle}</h4>}
                </div>
                <div className="stats-card-icon">
                    <Icon size={40} strokeWidth={1.5} />
                </div>
            </div>
        );
    };

    const stats = {
        totalHospitals: hospitals.length,
        newThisMonth: hospitals.filter((h) => {
            if (!h.created_at) return false;
            const created = new Date(h.created_at);
            const now = new Date();
            return created.getMonth() === now.getMonth() && created.getFullYear() === now.getFullYear();
        }).length,
    };

    return (
        <div className="main-content">
            <Header
                title="Activity"
                subtitle="Monitoring Performance"
                Icon={Activity}
                buttonLabel={null}
                onButtonClick={null}
            />

            <div className="activities">
                <div className="stats-cards">
                    <StatCard
                        icon={Building2}
                        title="Total Hospitals"
                        value={stats.totalHospitals}
                        subtitle="Registered facilities"
                    />
                    <StatCard
                        icon={Bot}
                        title="Total Built"
                        value={totalBuilt}
                        subtitle="Navatars created"
                    />
                    <StatCard
                        icon={TrendingUp}
                        title="New This Month"
                        value={stats.newThisMonth}
                        subtitle="Recently added"
                    />
                    <StatCard
                        icon={Bot}
                        title="Total Assigned"
                        value={totalAssigned}
                        subtitle="Navatars linked to hospitals"
                    />

                </div>
            </div>
        </div>
    );
};

export default Activities;
