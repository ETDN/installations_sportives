import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Modal from "react-modal";

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

Modal.setAppElement("#root");

const BassinsIndex = () => {
  const { id_piscine } = useParams();
  const [piscine, setPiscine] = useState(null);
  const [piscines, setPiscines] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedTimeslots, setSelectedTimeslots] = useState([]);

  const handleTimeslotSelection = (timeslot) => {
    setSelectedTimeslots((prevTimeslots) => {
      const timeslotIndex = prevTimeslots.findIndex(
        (t) => t.id === timeslot.id
      );

      if (timeslotIndex > -1) {
        // Le timeslot est déjà sélectionné, le retirer du tableau
        const updatedTimeslots = [...prevTimeslots];
        updatedTimeslots.splice(timeslotIndex, 1);
        return updatedTimeslots;
      } else {
        // Le timeslot n'est pas encore sélectionné, l'ajouter au tableau
        return [...prevTimeslots, timeslot];
      }
    });
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

  const handleDateSelection = (date) => {
    setSelectedDate(date);
    setIsPopupOpen(true);
  };

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleSaveButtonClick = async () => {
    console.log("ntm");
    if (selectedTimeslots.length > 0) {
      try {
        const response = await axios.put(
          "http://localhost:3001/update-timeslots",
          {
            timeslots: selectedTimeslots.map((timeslot) => ({
              id: timeslot.id,
              is_available: timeslot.is_available,
            })),
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        // Effectuer d'autres actions après la mise à jour réussie
        // ...
      } catch (error) {
        console.log(error);
        console.log(error.message);
        console.log(error.response);
      }
    }

    if (selectedDate) {
      console.log("Date sélectionnée :", selectedDate);
    }

    if (selectedTimeslots.length > 0) {
      console.log("Timeslots sélectionnés :");
      selectedTimeslots.forEach((timeslot) => {
        console.log(" - ", timeslot.start_time, "-", timeslot.end_time);
      });
    }
  };

  return (
    <>
      <BassinContainer>
        <ContainerImg>
          <h1>{piscine && piscine.nom_piscine}</h1>
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
            <TimeslotsContainer>
              {piscines &&
              piscines.length > 0 &&
              piscines[0]?.timeslots.length > 0 ? (
                piscines[0].timeslots.map((timeslot, index) => (
                  <div key={index}>
                    <TimeslotsItem
                      className={
                        selectedTimeslots.includes(timeslot) ? "selected" : ""
                      }
                      onClick={() => handleTimeslotSelection(timeslot)}
                    >
                      {timeslot.start_time} - {timeslot.end_time}
                    </TimeslotsItem>
                  </div>
                ))
              ) : (
                <p>No timeslots available</p>
              )}
            </TimeslotsContainer>
            <Button onClick={handleSaveButtonClick}>Sauvegarder</Button>
          </Modal>
        </TimeslotsContainer>
      </InfoContainer>
    </>
  );
};

export default BassinsIndex;
