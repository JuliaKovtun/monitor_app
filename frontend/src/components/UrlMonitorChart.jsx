import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Scatter
} from 'recharts';

const UrlMonitorChart = ({ data }) => {
  const { name, url, status, last_checked_at, checks } = data;

  const chartData = checks.map((check) => ({
    checked_at: new Date(check.checked_at).toLocaleTimeString(),
    response_time: check.response_time,
    success: check.success,
  }));

  
  return (
    <div className="card shadow-sm p-3 mb-4">
      {/* Monitor Info */}
      <div className="card-body">
        <h5 className="card-title">{name}</h5>

        <p className="mb-2">
          <strong>URL: </strong>
          <a href={url} target="_blank" rel="noopener noreferrer" className="text-break">
            {url}
          </a>
        </p>

        <p className="mb-2">
          <strong>Status: </strong>
          <span className={`badge ${status === "up" ? "bg-success" : "bg-danger"}`}>
            {status ? status.toUpperCase() : "N/A"}
          </span>
        </p>

        <p className="mb-3">
          <strong>Last Checked: </strong>
          {last_checked_at ? new Date(last_checked_at).toLocaleString() : "N/A"}
        </p>

        {checks.length > 0 ? (
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={chartData} margin={{ top: 10, right: 20, left: 10, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="checked_at" angle={-45} textAnchor="end" height={50} />
                <YAxis />
                <Tooltip />
                <Legend />

                <Line type="monotone" dataKey="response_time" stroke="#007bff" strokeWidth={2} />

              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <p className="text-muted">No checks available yet.</p>
        )}
      </div>
    </div>
  );


};

export default UrlMonitorChart;
