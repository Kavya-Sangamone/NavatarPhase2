import React, { useState, useEffect } from 'react';
import { Bot } from 'lucide-react';
import AddNavatarModal from './AddNavatarModal';
import NavatarManagement from './NavatarManagement';
import { fetchNavatars as fetchNavatarsAPI } from '../apis/navatarApi';
import Header from '../Header';

function Navatar() {
  const [navatars, setNavatars] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchNavatars = async () => {
    setLoading(true);
    try {
      const response = await fetchNavatarsAPI();
      setNavatars(response.data);
    } catch (error) {
      console.error('Error fetching Navatars:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNavatars();
  }, []);

  return (
    <div className="navatar-container">
      <div className="main-content">
        <Header
          title="Navtar"
          subtitle="Navatar Management Dashboard"
          Icon={Bot}
          buttonLabel="Add Navatar"
          onButtonClick={() => setShowAddForm(true)}
        />

        <div className="container">
          <div className="navatar">
            {loading ? (
              <div className="loading-indicator">Loading navatars...</div>
            ) : (
              <NavatarManagement navatars={navatars} fetchNavatars={fetchNavatars} />
            )}
          </div>

          {showAddForm && (
            <AddNavatarModal
              onClose={() => setShowAddForm(false)}
              fetchNavatars={fetchNavatars}
            />
          )}
        </div>

      </div>
    </div>
  );
}

export default Navatar;
