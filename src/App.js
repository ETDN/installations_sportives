import React, { useState } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import SportsFieldMap from "./components/image_mapper";
import Calendar from "react-calendar";
import InfrastructuresIndex from "./components/pages/infrastructures/InfrastructuresIndex";
import BassinsIndex from "./components/pages/pools/bassins/BassinsIndex";
import TerrainsIndex from "./components/pages/centres/terrains/TerrainsIndex";
import SallesIndex from "./components/pages/gyms/salles/SallesIndex";
import "../src/css/calendrier.css";
import "react-calendar/dist/Calendar.css";

function App() {
  const [date, setDate] = useState(new Date());

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<InfrastructuresIndex />} />
        <Route path="/mapper" element={<SportsFieldMap />} />
        <Route
          path="/calendar"
          element={
            <div className="app">
              <h1 className="text-center">React Calendar</h1>
              <div className="calendar-container">
                <Calendar onChange={setDate} value={date} />
              </div>
              <p className="text-center">
                <span className="bold">Selected Date:</span>{" "}
                {date.toDateString()}
              </p>
            </div>
          }
        />
        <Route
          path="/calendrier"
          element={
            <div className="app">
              <h1 className="text-center">React Calendar</h1>
              <div className="calendar-container">
                <Calendar onChange={setDate} value={date} />
              </div>
              <p className="text-center">
                <span className="bold">Selected Date:</span>{" "}
                {date.toDateString()}
              </p>
            </div>
          }
        />
        <Route path="/infrastructure" element={<InfrastructuresIndex />} />
        <Route path="/piscine/:id_piscine/bassins" element={<BassinsIndex />} />
        <Route path="/gym/:id_gym/salles" element={<SallesIndex />} />
        <Route path="/centre/:id_centre/terrains" element={<TerrainsIndex />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
