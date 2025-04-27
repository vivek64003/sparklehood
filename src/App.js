import React, { useState } from 'react';
import './App.css';
import IncidentList from './components/IncidentList';
import FilterControls from './components/FilterControls';
import SortControls from './components/SortControls';
import NewIncidentForm from './components/NewIncidentForm';

const initialIncidents = [
  { 
    id: 1, 
    title: "Biased Recommendation Algorithm", 
    description: "Algorithm consistently favored certain demographics...", 
    severity: "Medium", 
    reported_at: "2025-03-15T10:00:00Z" 
  },
  { 
    id: 2, 
    title: "LLM Hallucination in Critical Info", 
    description: "LLM provided incorrect safety procedure information...", 
    severity: "High", 
    reported_at: "2025-04-01T14:30:00Z" 
  },
  { 
    id: 3, 
    title: "Minor Data Leak via Chatbot", 
    description: "Chatbot inadvertently exposed non-sensitive user metadata...", 
    severity: "Low", 
    reported_at: "2025-03-20T09:15:00Z" 
  }
];

function App() {
  const [incidents, setIncidents] = useState(initialIncidents);
  const [filter, setFilter] = useState('All');
  const [sortOrder, setSortOrder] = useState('newest');
  const [showForm, setShowForm] = useState(false);
  const [newIncidentIds, setNewIncidentIds] = useState(new Set());

  const handleAddIncident = (newIncident) => {
    const incidentWithId = {
      ...newIncident,
      id: Date.now(),
      reported_at: new Date().toISOString()
    };
    
    setIncidents([...incidents, incidentWithId]);
    setNewIncidentIds(new Set(newIncidentIds).add(incidentWithId.id));
    setShowForm(false);
    
    setTimeout(() => {
      setNewIncidentIds(prev => {
        const updated = new Set(prev);
        updated.delete(incidentWithId.id);
        return updated;
      });
    }, 5000);
  };

  const filteredIncidents = incidents.filter(incident => 
    filter === 'All' || incident.severity === filter
  );

  const sortedIncidents = [...filteredIncidents].sort((a, b) => {
    const dateA = new Date(a.reported_at);
    const dateB = new Date(b.reported_at);
    return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
  });

  return (
    <div className="app-container">
      <div className="app">
        <header className="app-header">
          <h1>AI Safety Incident Dashboard</h1>
          <p className="app-subtitle">Monitoring and reporting platform for AI safety issues</p>
        </header>
        
        <div className="controls-container">
          <div className="filter-sort-group">
            <FilterControls currentFilter={filter} onFilterChange={setFilter} />
            <SortControls currentSort={sortOrder} onSortChange={setSortOrder} />
          </div>
          
          <div className="button-container">
            <button 
              onClick={() => setShowForm(!showForm)} 
              className={`toggle-form-btn ${showForm ? 'cancel' : ''}`}
              aria-expanded={showForm}
            >
              {showForm ? (
                <>
                  <span className="icon">×</span> Cancel
                </>
              ) : (
                <>
                  <span className="icon">+</span> Report New Incident
                </>
              )}
            </button>
          </div>
        </div>
        
        {showForm && (
          <NewIncidentForm 
            onAddIncident={handleAddIncident} 
            onCancel={() => setShowForm(false)}
          />
        )}
        
        <div className="stats-bar">
          <div className="stat-item">
            <span className="stat-value">{incidents.length}</span>
            <span className="stat-label">Total Incidents</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">
              {incidents.filter(i => i.severity === 'High').length}
            </span>
            <span className="stat-label">High Severity</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">
              {newIncidentIds.size}
            </span>
            <span className="stat-label">New Today</span>
          </div>
        </div>
        
        <IncidentList 
          incidents={sortedIncidents} 
          newIncidentIds={newIncidentIds} 
        />
      </div>
    </div>
  );
}

export default App;