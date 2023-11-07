import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Select, MenuItem } from '@mui/material';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement);

const LineChart = () => {
  const [data, setData] = useState([]);
  const [deviceId, setDeviceId] = useState("");
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    if (deviceId) {
      axios.get(`/data/${deviceId}`)
        .then(res => {
          setData(res.data);
          setLoading(false); // Set loading to false after data is fetched
        })
        .catch(err => console.error(err));
    }
  }, [deviceId]);

  const chartData = {
    labels: data.map(item => item.timestamp),
    datasets: [{
      data: data.map(item => item.value),
      fill: false,
      backgroundColor: 'rgb(75, 192, 192)',
      borderColor: 'rgba(75, 192, 192, 0.2)',
    }],
  };

  // Update onChange handler
  const handleDeviceIdChange = (event) => {
    setDeviceId(event.target.value);
  };

  return (
    <div>
      <Select value={deviceId} onChange={handleDeviceIdChange} disabled={loading}>
        {data.map(item => (
          <MenuItem value={item.device_id}>{item.device_id}</MenuItem>
        ))}
      </Select>
      <Line data={chartData} />
    </div>
  );
};

export default LineChart;
