import React, { useState } from 'react';
import '../App.css';

const NewIncidentForm = ({ onAddIncident, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    severity: 'Medium'
  });

  const [errors, setErrors] = useState({
    title: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onAddIncident(formData);
      // Reset form
      setFormData({
        title: '',
        description: '',
        severity: 'Medium'
      });
    }
  };

  return (
    <div className="incident-form-container">
      <div className="incident-form">
        <h2>Report New Incident</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title*</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={errors.title ? 'has-error' : ''}
              placeholder="Enter incident title"
            />
            {errors.title && <span className="error-message">{errors.title}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="description">Description*</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={errors.description ? 'has-error' : ''}
              placeholder="Provide detailed description of the incident"
            />
            {errors.description && <span className="error-message">{errors.description}</span>}
          </div>
          
          <div className="form-group">
            <label>Severity Level</label>
            <div className="severity-options">
              <div className="severity-option">
                <input
                  type="radio"
                  id="low"
                  name="severity"
                  value="Low"
                  checked={formData.severity === "Low"}
                  onChange={handleChange}
                />
                <label htmlFor="low">
                  <span className="severity-dot low"></span>
                  Low
                </label>
              </div>
              <div className="severity-option">
                <input
                  type="radio"
                  id="medium"
                  name="severity"
                  value="Medium"
                  checked={formData.severity === "Medium"}
                  onChange={handleChange}
                />
                <label htmlFor="medium">
                  <span className="severity-dot medium"></span>
                  Medium
                </label>
              </div>
              <div className="severity-option">
                <input
                  type="radio"
                  id="high"
                  name="severity"
                  value="High"
                  checked={formData.severity === "High"}
                  onChange={handleChange}
                />
                <label htmlFor="high">
                  <span className="severity-dot high"></span>
                  High
                </label>
              </div>
            </div>
          </div>
          
          <div className="form-buttons">
            <button
              type="button"
              className="cancel-btn"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              Submit Incident
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewIncidentForm;