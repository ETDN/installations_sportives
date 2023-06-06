import React, { useState } from "react";
import Calendar from "react-calendar";
import "../../css/calendrier.css";

function Calendrier() {
  const [date, setDate] = useState(new Date());

  return (
    <div className="react-calendar">
      <div className="calendar-container">
        <Calendar onChange={setDate} value={date} />
      </div>
      <p className="text-center">
        <span className="bold">Selected Date:</span> {date.toDateString()}
      </p>
    </div>
  );
}

export default Calendrier;
