import React, { useState } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import SportsFieldMap from "./components/image_mapper";
import PoolReservation from "./components/pool_reservation";
import CalendarTemplate from "./components/calendar";
import InfrastructuresIndex from "./components/pages/infrastructures/InfrastructuresIndex";
import PiscinesComponent from "./components/PiscinesComponent";
import BassinsIndex from "./components/pages/pools/bassins/BassinsIndex";

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
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/infrastructure" element={<InfrastructuresIndex />} />
        <Route path="/piscine" element={<PiscinesComponent />} />
        <Route path="/piscine/:id_piscine/bassins" element={<BassinsIndex />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
