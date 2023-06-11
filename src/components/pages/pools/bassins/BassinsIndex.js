import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Modal from "react-modal";
import moment from "moment";
import "moment/locale/fr";

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
  GridContainer,
  AddressTitle,
  AdressElement,
  ContainerRight,
  WrapperImg,
  WrapperDescription,
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
          "http://localhost:3001/save-reservation",
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
      const formattedDate = moment(selectedDate).format("DD/MM/YYYY");
      console.log("Date sélectionnée :", formattedDate);
    }

    if (selectedTimeslots.length > 0) {
      console.log("Timeslots sélectionnés :");
      selectedTimeslots.forEach((timeslot) => {
        console.log(" - ", timeslot.start_time, "-", timeslot.end_time);
      });
    }
  };

  return (
    <BassinContainer>
      <ContainerRight>
        <h1>{piscine && piscine.nom_piscine}</h1>
        <WrapperImg>
          <IconGym
            src={piscines && piscines.length > 0 ? piscines[0].image : ""}
          />
          <GridContainer>
            <AddressTitle>{piscine && piscine.nom_piscine}</AddressTitle>
            <AdressElement>
              Rue de Guillamo 3
              <br />
              3960 Sierre
              <br />
              027 452 02 70
              <br />
              piscine@sierre.ch
            </AdressElement>
          </GridContainer>
        </WrapperImg>
        <WrapperDescription>
          <DescriptionContainer>
            <p>
              {piscines && piscines.length > 0
                ? piscines[0].description
                : "No description available"}
            </p>
          </DescriptionContainer>
        </WrapperDescription>
        <h3>Période d'exploitation 2022-2022</h3>
        <p>Fermeture le dimanche 21 mai 2023</p>
        <p>Réouverture dès le mercredi 6 septembre 2023</p>

        <h3>Horaires d'ouverture</h3>
        <p>Lundi: 10h00 - 13h00</p>
        <p>Mardi à vendredi: 10h00 - 21h00</p>
      </ContainerRight>
      <InfoContainer>
        <div>
          <h1>Réservations</h1>
        </div>
        <CalendarContainer>
          <Calendrier onDateSelect={handleDateSelection} />
        </CalendarContainer>
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
      </InfoContainer>
    </BassinContainer>
  );
};

export default BassinsIndex;
