import React, { useState } from "react";

function PoolReservation() {
  const [pools, setPools] = useState([
    { id: 1, reserved: false },
    { id: 2, reserved: false },
    { id: 3, reserved: false },
    { id: 4, reserved: false },
  ]);

  const handlePoolClick = (id) => {
    const updatedPools = pools.map((pool) => {
      if (pool.id === id) {
        return { ...pool, reserved: !pool.reserved };
      }
      return pool;
    });
    setPools(updatedPools);
  };

  const handleReservation = () => {
    const date = document.getElementById("date-picker").value;
    const startTime = document.getElementById("start-time-picker").value;
    const endTime = document.getElementById("end-time-picker").value;

    // Send reservation data to server and update pool availability accordingly
  };

  return (
    <div>
      <div id="pool-container">
        <div
          className={"pool" + (pools[0].reserved ? " reserved" : "")}
          onClick={() => handlePoolClick(1)}
          id="pool-1"
        ></div>
        <div
          className={"pool" + (pools[1].reserved ? " reserved" : "")}
          onClick={() => handlePoolClick(2)}
          id="pool-2"
        ></div>
        <div
          className={"pool" + (pools[2].reserved ? " reserved" : "")}
          onClick={() => handlePoolClick(3)}
          id="pool-3"
        ></div>
        <div
          className={"pool" + (pools[3].reserved ? " reserved" : "")}
          onClick={() => handlePoolClick(4)}
          id="pool-4"
        ></div>
      </div>

      <div id="reservation-form">
        <input type="date" id="date-picker" />
        <input type="time" id="start-time-picker" />
        <input type="time" id="end-time-picker" />
        <button id="reserve-button" onClick={handleReservation}>
          Réserver
        </button>
      </div>
    </div>
  );
}

export default PoolReservation;
