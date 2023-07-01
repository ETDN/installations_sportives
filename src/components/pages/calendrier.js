import React, { useState } from "react";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar } from "react-modern-calendar-datepicker";

const App = ({ handleDateSelection }) => {
  const [selectedDays, setSelectedDays] = useState([]);

  const handleCalendarSelection = (date) => {
    setSelectedDays(date);
    handleDateSelection(date);
  };

  return (
    <Calendar
      value={selectedDays}
      onChange={handleCalendarSelection}
      shouldHighlightWeekends
    />
  );
};

export default App;
