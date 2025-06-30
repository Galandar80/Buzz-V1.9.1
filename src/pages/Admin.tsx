import React from 'react';
import { Link } from 'react-router-dom';
import AdminPanel from '../components/AdminPanel';

const Admin: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">🔧 Amministrazione</h1>
          <p className="text-lg text-purple-200">Gestisci le stanze di gioco attive</p>
        </div>

        {/* Pannello Admin */}
        <AdminPanel />

        {/* Link per tornare alla home */}
        <div className="text-center mt-8">
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 bg-purple-500/20 hover:bg-purple-500/30 text-purple-200 rounded-lg transition-colors border border-purple-400/30"
          >
            ← Torna alla Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Admin; 