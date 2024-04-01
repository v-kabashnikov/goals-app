import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import {
  convertToTotalMinutes,
  timeUntilNextTracking,
} from "../../utils/timeUtils";

const AddStat = ({ goalId, lastTrackedAt, trackingInterval, onUpdate }) => {
  const [hours, setHours] = useState("0");
  const [minutes, setMinutes] = useState("30");
  const [days, setDays] = useState("0");
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const timer = timeUntilNextTracking(lastTrackedAt, trackingInterval);
    setTimeLeft(timer);
  }, [lastTrackedAt, trackingInterval]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const token = document.querySelector('meta[name="csrf-token"]').content;
    const convertedValue = convertToTotalMinutes(days, hours, minutes);
    try {
      const response = await fetch(`/api/v1/goals/${goalId}/stats`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": token,
        },
        body: JSON.stringify({ stat: { value: convertedValue } }),
      });

      if (!response.ok) throw new Error("Network response was not ok.");

      onUpdate();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error adding stat:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const modalContent = (
    <div
      className="modal-container"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
        zIndex: 1000,
      }}
    >
      <div
        className="modal-dialog"
        style={{ position: "relative", width: "100%", maxWidth: "500px" }}
      >
        <div
          className="modal-content"
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          }}
        >
          <div
            className="modal-header"
            style={{
              marginBottom: "20px",
              paddingBottom: "20px",
              borderBottom: "1px solid #e5e5e5",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <h5 className="modal-title" style={{ margin: 0 }}>
              Add Progress
            </h5>
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              style={{
                background: "transparent",
                border: "none",
                fontSize: "1.5rem",
                cursor: "pointer",
              }}
            >
              &times;
            </button>
          </div>
          <div className="modal-body">
            <form
              onSubmit={handleSubmit}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "20px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <label style={{ marginBottom: "5px" }}>Days</label>
                <input
                  type="number"
                  value={days}
                  onChange={(e) => setDays(e.target.value)}
                  required
                  min="0"
                  max="30"
                  style={{
                    padding: "10px",
                    border: "1px solid #e5e5e5",
                    borderRadius: "4px",
                    width: "100%",
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <label style={{ marginBottom: "5px" }}>Hours</label>
                <input
                  type="number"
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                  required
                  min="0"
                  max="23"
                  style={{
                    padding: "10px",
                    border: "1px solid #e5e5e5",
                    borderRadius: "4px",
                    width: "100%",
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <label style={{ marginBottom: "5px" }}>Minutes</label>
                <input
                  type="number"
                  value={minutes}
                  onChange={(e) => setMinutes(e.target.value)}
                  required
                  min="1"
                  max="59"
                  style={{
                    padding: "10px",
                    border: "1px solid #e5e5e5",
                    borderRadius: "4px",
                    width: "100%",
                  }}
                />
              </div>
              <div
                style={{
                  gridColumn: "1 / -1",
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "20px",
                }}
              >
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  style={{
                    padding: "10px 20px",
                    marginRight: "10px",
                    border: "1px solid #e5e5e5",
                    background: "transparent",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  style={{
                    padding: "10px 20px",
                    border: "none",
                    backgroundColor: "#007bff",
                    color: "white",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {timeLeft ? (
        <div id="timeLeft">{timeLeft}</div>
      ) : (
        <>
          <i
            className="bi bi-plus-circle"
            onClick={() => setIsModalOpen(true)}
            style={{ cursor: "pointer", fontSize: "24px", margin: "10px" }}
          ></i>
          {isModalOpen && ReactDOM.createPortal(modalContent, document.body)}
        </>
      )}
    </>
  );
};

export default AddStat;
