import React, { useEffect, useState } from 'react';
import api from './api';
import './App.css'; 
// Importamos os ícones para manter o visual profissional
import { LayoutDashboard, Tool, AlertTriangle, CheckCircle } from 'lucide-react';

function App() {
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    // Busca os dados do teu backend no Render
    api.get('/assets')
      .then(res => setAssets(res.data))
      .catch(err => console.error("Erro ao procurar ativos:", err));
  }, []);

  const stats = {
    total: assets.length,
    critical: assets.filter(a => a.status === 'Vermelho').length,
    warning: assets.filter(a => a.status === 'Amarelo').length,
    ok: assets.filter(a => a.status === 'Verde').length,
  };

  return (
    <div className="container">
      <header className="main-header">
        <div className="header-content">
          <h1>SIMMPA | Gestão Patrimonial CAEMA</h1>
          <div className="unit-badge">Unidade Operacional</div>
        </div>
      </header>

      <div className="dashboard-grid">
        <div className="card blue">
          <div className="card-icon"><LayoutDashboard size={32} /></div>
          <div>
            <p className="card-label">Total Ativos</p>
            <p className="card-value">{stats.total}</p>
          </div>
        </div>

        <div className="card red">
          <div className="card-icon"><AlertTriangle size={32} /></div>
          <div>
            <p className="card-label">Críticos</p>
            <p className="card-value">{stats.critical}</p>
          </div>
        </div>

        <div className="card green">
          <div className="card-icon"><CheckCircle size={32} /></div>
          <div>
            <p className="card-label">Conformes</p>
            <p className="card-value">{stats.ok}</p>
          </div>
        </div>
      </div>

      <div className="table-container">
        <h2 className="table-title">Monitoramento de Ativos em Tempo Real</h2>
        <table className="simmpa-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome do Ativo</th>
              <th>Categoria</th>
              <th>Status</th>
              <th>Última Manutenção</th>
            </tr>
          </thead>
          <tbody>
            {assets.map(asset => (
              <tr key={asset.id}>
                <td>#{asset.id}</td>
                <td className="font-bold">{asset.name}</td>
                <td>{asset.category}</td>
                <td>
                  <span className={`badge bg-${asset.status === 'Verde' ? 'green' : asset.status === 'Vermelho' ? 'red' : 'yellow'}`}>
                    {asset.status}
                  </span>
                </td>
                <td>{asset.last_maintenance ? new Date(asset.last_maintenance).toLocaleDateString() : 'Pendente'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;