import React, { useState } from "react";
import Calendar from "react-calendar";
import "../../css/calendrier.css";

function Calendrier({ onDateSelect }) {
  const [date, setDate] = useState(new Date());

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
    onDateSelect(selectedDate.toDateString()); // Formater la date en tant que chaîne de caractères
  };

  return (
    <div className="react-calendar">
      <div className="calendar-container">
        <Calendar onChange={handleDateChange} value={date} />
      </div>
    </div>
  );
}

export default Calendrier;
