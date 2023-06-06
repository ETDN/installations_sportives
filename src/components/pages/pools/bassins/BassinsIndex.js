import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Modal from "react-modal";

import { Paragraph, Titre } from "../../infrastructures/InfrastructureElement";
import {
  BassinContainer,
  Button,
  CalendarContainer,
  ContainerImg,
  DescriptionContainer,
  InfoContainer,
  TimeslotsContainer,
  TimeslotsItem,
  Popup,
} from "./BassinElement";
import { IconGym } from "../../gyms/salles/SalleElement";
import Calendrier from "../../calendrier";

const BassinsIndex = () => {
  const { id_piscine } = useParams();
  const [piscine, setPiscine] = useState(null);
  const [piscines, setPiscines] = useState(null);
  const [selectedTimeslot, setSelectedTimeslot] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleTimeslotSelection = (timeslot) => {
    setSelectedTimeslot(timeslot);
    setIsPopupOpen(true);
  };

  const handleDateSelection = (date) => {
    setSelectedDate(date);
    console.log(date);
    setIsPopupOpen(true);
  };

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  useEffect(() => {
    const fetchPiscine = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/piscines/${id_piscine}?_embed=bassins`
        );
        const data = response.data;
        setPiscine(data);
        setPiscines(data.piscinesInfo);
      } catch (error) {
        // Gérer les erreurs
      }
    };

    fetchPiscine();
  }, [id_piscine]);

  if (!piscine) {
    return <div>Loading...</div>;
  }

  const handleConfirmButtonClick = () => {
    // Vérifiez si un timeslot est sélectionné
    if (selectedTimeslot) {
      // Mettez à jour l'attribut "is_available" du timeslot en false
      selectedTimeslot.is_available = false;
      // Mettez à jour la base de données ou effectuez toute autre action requise
      // ...

      // Réinitialisez l'état selectedTimeslot
      setSelectedTimeslot(null);
    }
  };

  return (
    <>
      <BassinContainer>
        <ContainerImg>
          <h1>{piscine.nom_piscine}</h1>
          <IconGym
            src={piscines && piscines.length > 0 ? piscines[0].image : ""}
          />

          <DescriptionContainer>
            <p>
              {piscines && piscines.length > 0
                ? piscines[0].description
                : "No description available"}
            </p>
          </DescriptionContainer>
        </ContainerImg>
      </BassinContainer>
      <InfoContainer>
        <CalendarContainer>
          <Calendrier onDateSelect={handleDateSelection} />
        </CalendarContainer>
        <TimeslotsContainer>
          <Button onClick={handleOpenPopup}>Open Popup</Button>

          <Modal isOpen={isPopupOpen} onRequestClose={handleClosePopup}>
            <h2>Timeslots for {selectedDate}</h2>
            <TimeslotsItem>
              {piscines.length > 0 && piscines[0]?.timeslots.length > 0 ? (
                piscines[0].timeslots.map((timeslot, index) => (
                  <div key={index}>
                    <p>
                      {timeslot.start_time} - {timeslot.end_time}
                    </p>
                    <p>
                      {timeslot.is_available ? "Available" : "Not available"}
                    </p>
                  </div>
                ))
              ) : (
                <p>No timeslots available</p>
              )}
            </TimeslotsItem>
            <Button onClick={handleClosePopup}>Close</Button>
          </Modal>
        </TimeslotsContainer>
      </InfoContainer>
    </>
  );
};

export default BassinsIndex;
