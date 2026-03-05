import React, { useEffect, useState } from 'react';
import api from './api';
import { LayoutDashboard, Tool, AlertTriangle, CheckCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

function App() {
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    api.get('/assets').then(res => setAssets(res.data));
  }, []);

  const stats = {
    total: assets.length,
    critical: assets.filter(a => a.status === 'Vermelho').length,
    ok: assets.filter(a => a.status === 'Verde').length,
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="mb-8 border-b pb-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-800">SIMMPA | Gestão Patrimonial CAEMA</h1>
        <div className="bg-blue-100 p-2 rounded text-blue-800 font-bold">Vinhais - Unidade Operacional</div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card icon={<LayoutDashboard/>} label="Total Ativos" value={stats.total} color="blue" />
        <Card icon={<AlertTriangle/>} label="Críticos (Vermelho)" value={stats.critical} color="red" />
        <Card icon={<CheckCircle/>} label="Conformes" value={stats.ok} color="green" />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-bold mb-4">Lista de Ativos e Status</h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="p-3 border-b">Ativo</th>
              <th className="p-3 border-b">Categoria</th>
              <th className="p-3 border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            {assets.map(asset => (
              <tr key={asset.id}>
                <td className="p-3 border-b">{asset.name}</td>
                <td className="p-3 border-b">{asset.category}</td>
                <td className="p-3 border-b">
                  <span className={`px-2 py-1 rounded text-white text-xs ${asset.status === 'Verde' ? 'bg-green-500' : asset.status === 'Vermelho' ? 'bg-red-500' : 'bg-yellow-500'}`}>
                    {asset.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const Card = ({ icon, label, value, color }) => (
  <div className={`bg-white p-6 rounded-lg shadow border-l-4 border-${color}-500 flex items-center`}>
    <div className={`mr-4 text-${color}-500`}>{icon}</div>
    <div>
      <p className="text-gray-500 text-sm uppercase font-bold">{label}</p>
      <p className="text-2xl font-black">{value}</p>
    </div>
  </div>
);

export default App;