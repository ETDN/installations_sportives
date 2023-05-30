import React, { useState } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import SportsFieldMap from "./components/image_mapper";
import PoolReservation from "./components/pool_reservation";
import CalendarTemplate from "./components/calendar";
import InfrastructuresIndex from "./components/pages/infrastructures/InfrastructuresIndex";
import BassinsIndex from "./components/pages/pools/bassins/BassinsIndex";
import TerrainsIndex from "./components/pages/centres/terrains/TerrainsIndex";
import SallesIndex from "./components/pages/gyms/salles/SallesIndex";

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
        <Route path="/piscine/:id_piscine/bassins" element={<BassinsIndex />} />
        <Route path="/gym/:id_gym/salles" element={<SallesIndex />} />
        <Route path="/centre/:id_centre/terrains" element={<TerrainsIndex />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
