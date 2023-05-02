import React, { useState } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import SportsFieldMap from "./components/image_mapper";
import PoolReservation from "./components/pool_reservation";
import CalendarTemplate from "./components/calendar";
import Calendar2 from "./components/calendar2";

function App() {
  const [availability, setAvailability] = useState([]);
  const Calendar = CalendarTemplate({
    availability,
    setAvailability,
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SportsFieldMap />} />
        <Route path="/pool" element={<PoolReservation />} />
        <Route path="/mapper" element={<SportsFieldMap />} />
        <Route path="/calendar" element={<Calendar2 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
