import React from 'react';
import IncidentItem from './IncidentItem';

const IncidentList = ({ incidents, newIncidentIds }) => {
  return (
    <div className="incident-list">
      {incidents.length === 0 ? (
        <p className="no-incidents">No incidents found matching the current filter.</p>
      ) : (
        incidents.map(incident => (
          <IncidentItem 
            key={incident.id} 
            incident={incident} 
            isNew={newIncidentIds.has(incident.id)}
          />
        ))
      )}
    </div>
  );
};

export default IncidentList;