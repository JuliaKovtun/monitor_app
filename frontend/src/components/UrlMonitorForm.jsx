import React, { useState } from 'react';
import API from "../api/axios";


const UrlMonitorForm = ( { onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    check_interval: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await API.post("/url_monitors", { url_monitor: formData, headers: { Authorization: `Bearer ${token}` } })
      if (response.status === 201) {
        const newMonitor = response.data;
        newMonitor.checks = [];
        onSuccess(newMonitor);
        setFormData({
          name: '',
          url: '',
          check_interval: ''
        });

      } else {
        console.error('Failed to create URL Monitor');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div className="card shadow-sm p-3 mb-4 w-50 mx-auto">        
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-2">
            <label htmlFor="url" className="form-label">URL</label>
            <input
              type="url"
              id="url"
              name="url"
              className="form-control"
              value={formData.url}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-2">
            <label htmlFor="check_interval" className="form-label">Check Interval (minutes)</label>
            <input
              type="number"
              id="check_interval"
              name="check_interval"
              className="form-control"
              value={formData.check_interval}
              onChange={handleChange}
              required
            />
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary">Create</button>
          </div>
        </form>
    </div>
  );

};

export default UrlMonitorForm;
