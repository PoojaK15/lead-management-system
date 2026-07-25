import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Dashboard = () => {
  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchLeads = async (query = '') => {
    try {
      setLoading(true);
      const res = await api.get(`/leads?search=${encodeURIComponent(query)}`);
      setLeads(res.data.data || []);
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await api.patch(`/leads/${id}/status`, { status });
      fetchLeads(search);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-6xl rounded-2xl bg-white p-6 shadow-lg">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Admin Dashboard</h2>
            <p className="text-sm text-slate-600">Manage all your leads and update their status.</p>
          </div>
          <button onClick={() => { localStorage.removeItem('token'); navigate('/login'); }} className="rounded bg-slate-900 px-4 py-2 text-sm font-medium text-white">
            Logout
          </button>
        </div>

        <input value={search} onChange={(e) => { setSearch(e.target.value); fetchLeads(e.target.value); }} className="mb-6 w-full rounded border border-slate-300 px-3 py-2" placeholder="Search by name, email or status" />

        {loading ? <p>Loading leads...</p> : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="px-3 py-2">Name</th>
                  <th className="px-3 py-2">Email</th>
                  <th className="px-3 py-2">Budget</th>
                  <th className="px-3 py-2">Status</th>
                  <th className="px-3 py-2">Message</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr key={lead._id} className="border-t">
                    <td className="px-3 py-2">{lead.name}</td>
                    <td className="px-3 py-2">{lead.email}</td>
                    <td className="px-3 py-2">{lead.budget}</td>
                    <td className="px-3 py-2">
                      <select value={lead.status} onChange={(e) => updateStatus(lead._id, e.target.value)} className="rounded border border-slate-300 px-2 py-1">
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </td>
                    <td className="px-3 py-2">{lead.message}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
