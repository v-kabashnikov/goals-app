import React from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const StatsChart = ({ stats, targetValue }) => {
  const chartData = {
    labels: stats.map((stat) => new Date(stat.created_at).toLocaleDateString()),
    datasets: [
      {
        label: "Progress in minutes",
        data: stats.map((stat) => stat.value),
        fill: false,
        backgroundColor: "rgb(75, 192, 192)",
        borderColor: "rgba(75, 192, 192, 0.2)",
      },
      {
        label: "Target minutes",
        data: new Array(stats.length).fill(targetValue),
        fill: false,
        borderColor: "rgb(255, 99, 132)",
        borderDash: [5, 5],
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Value in Minutes",
        },
      },
      x: {
        title: {
          display: true,
          text: "Date",
        },
      },
    },
  };

  return (
    stats.length > 0 && (
      <div style={{ marginTop: "30px", textAlign: "center" }}>
        <h3>Stats Chart</h3>
        <Line data={chartData} options={chartOptions} />
      </div>
    )
  );
};

export default StatsChart;
