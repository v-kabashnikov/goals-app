import React from "react";
import { convertMinutesToTime } from "../../utils/timeUtils";

const Stats = ({ stats, goalId, onUpdate }) => {
  const deleteStat = (statId) => {
    if (window.confirm("Are you sure you want to delete this stat?")) {
      const url = `/api/v1/goals/${goalId}/stats/${statId}`;
      const token = document.querySelector('meta[name="csrf-token"]').content;
      fetch(url, {
        method: "DELETE",
        headers: {
          "X-CSRF-Token": token,
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok.");
          }
          onUpdate();
        })
        .catch((error) => console.error("Error:", error));
    }
  };

  if (stats.length === 0) {
    return (
      <div>
        <p className="text-center">
          There are currently no stats captured for this goal.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h3 style={{ textAlign: "center" }} className="mt-4">
        Stats Captured
      </h3>
      <ul className="list-group">
        {stats.map((stat) => (
          <li
            key={stat.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            Value: {convertMinutesToTime(stat.value)} - Recorded:{" "}
            {new Date(stat.created_at).toLocaleString()}
            <button
              onClick={() => deleteStat(stat.id)}
              className="btn btn-danger btn-sm"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Stats;
