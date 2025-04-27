import React, { useState, useEffect } from 'react';

const IncidentItem = ({ incident, isNew }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // This ensures the animation plays when the component mounts
    setIsVisible(true);
  }, []);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const severityClass = `severity-${incident.severity.toLowerCase()}`;

  return (
    <div className={`incident-item ${severityClass} ${isNew ? 'new-incident' : ''} ${isVisible ? 'visible' : ''}`}>
      <div className="incident-summary">
        <div className="incident-info">
          <h3>{incident.title}</h3>
          <div className="incident-meta">
            <span className={`severity-badge ${severityClass}`}>{incident.severity}</span>
            <span className="reported-date">{formatDate(incident.reported_at)}</span>
            {isNew && <span className="new-badge">New</span>}
          </div>
        </div>
        <button onClick={toggleExpand} className="view-details-btn">
          {isExpanded ? (
            <>
              <span className="icon">−</span> Hide Details
            </>
          ) : (
            <>
              <span className="icon">+</span> View Details
            </>
          )}
        </button>
      </div>
      {isExpanded && (
        <div className="incident-description">
          <p>{incident.description}</p>
        </div>
      )}
    </div>
  );
};

export default IncidentItem;