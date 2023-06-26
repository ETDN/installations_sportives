import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Modal from "react-modal";
import moment from "moment";
import "moment/locale/fr";
import Swal from "sweetalert2";

import {
  BassinContainer,
  Button,
  CalendarContainer,
  DescriptionContainer,
  InfoContainer,
  TimeslotsContainer,
  TimeslotsItem,
  ContainerRight,
  WrapperImg,
  WrapperDescription,
  PopupContainer,
  BassinList,
  ListElement,
  TitlePool,
} from "./BassinElement";
import { IconGym } from "../../gyms/salles/SalleElement";
import Calendrier from "../../calendrier";

Modal.setAppElement("#root");

const BassinsIndex = () => {
  const { id_piscine } = useParams();
  const [piscine, setPiscine] = useState(null);
  const [piscines, setPiscines] = useState(null);
  const [bassins, setBassins] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedBassin, setSelectedBassin] = useState(null);
  const [selectedTimeslot, setSelectedTimeslot] = useState(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [clientInfo, setClientInfo] = useState({
    nom: "",
    adresse: "",
    telephone: "",
  });

  const handleClientInfoChange = (event) => {
    const { name, value } = event.target;
    setClientInfo((prevClientInfo) => ({
      ...prevClientInfo,
      [name]: value,
    }));
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = (window.pageYOffset / scrollableHeight) * 100;

      const scrollbarThumb = document.querySelector(
        "::-webkit-scrollbar-thumb"
      );
      if (scrollbarThumb) {
        scrollbarThumb.style.height = `${scrollPercentage}%`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleTimeslotSelection = (timeslot) => {
    setSelectedTimeslot(timeslot);
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
        setBassins(data.bassinsInfo);
      } catch (error) {
        // Gérer les erreurs
      }
    };

    fetchPiscine();
  }, [id_piscine]);

  const handleDateSelection = (date) => {
    setSelectedDate(date);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleSaveButtonClick = async () => {
    if (selectedBassin && selectedTimeslot) {
      setIsPopupOpen(true);
      console.log(selectedBassin.id_bassin);
    } else {
      console.log("Veuillez sélectionner un bassin et un créneau horaire");
    }
  };

  const handleSaveReservation = async () => {
    try {
      const response = await axios.put(
        "http://localhost:3001/save-reservation",
        {
          bassinId: selectedBassin.id_bassin,
          date: selectedDate,
          timeslots: {
            timeslot_id: selectedTimeslot.timeslot_id,
            start_time: selectedTimeslot.start_time,
            end_time: selectedTimeslot.end_time,
          },
          client: clientInfo,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Fermer le popup
      setIsPopupOpen(false);
      Swal.fire(
        "Sauvegarde réussie",
        "La réservation a été sauvegardée avec succès.",
        "success"
      );
    } catch (error) {
      console.log(error);
      console.log(error.message);
      console.log(error.response);
    }
  };

  const handleBassinSelection = (bassin) => {
    setSelectedBassin(bassin);
    console.log(bassin.id_bassin);
  };

  return (
    <BassinContainer>
      <ContainerRight scrollPosition={scrollPosition}>
        <WrapperDescription>
          <WrapperImg>
            <IconGym
              src={piscines && piscines.length > 0 ? piscines[0].image : ""}
            />
          </WrapperImg>
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
        <TitlePool>
          <h1>{piscine && piscine.nom_piscine}</h1>
        </TitlePool>
        <TimeslotsContainer>
          {piscines &&
          piscines.length > 0 &&
          piscines[0]?.timeslots.length > 0 ? (
            piscines[0].timeslots.map((timeslot, index) => (
              <div key={index}>
                <TimeslotsItem
                  className={selectedTimeslot === timeslot ? "selected" : ""}
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
        <CalendarContainer>
          <Calendrier onDateSelect={handleDateSelection} />
        </CalendarContainer>
        <BassinList>
          {bassins && bassins.length > 0 ? (
            bassins.map((bassin) => (
              <ListElement key={bassin._id}>
                <input
                  type="radio"
                  name="bassin"
                  checked={selectedBassin === bassin}
                  onChange={() => handleBassinSelection(bassin)}
                />
                {bassin.nom_bassin}
              </ListElement>
            ))
          ) : (
            <li>Aucun bassin disponible</li>
          )}
        </BassinList>

        <Button onClick={handleSaveButtonClick}>Sauvegarder</Button>
      </InfoContainer>
      {isPopupOpen && (
        <PopupContainer>
          <h2>Informations du client</h2>
          <input
            type="text"
            name="nom"
            placeholder="Nom"
            value={clientInfo.nom}
            onChange={handleClientInfoChange}
          />
          <input
            type="text"
            name="adresse"
            placeholder="Adresse"
            value={clientInfo.adresse}
            onChange={handleClientInfoChange}
          />
          <input
            type="text"
            name="telephone"
            placeholder="Téléphone"
            value={clientInfo.telephone}
            onChange={handleClientInfoChange}
          />
          <button onClick={handleClosePopup}>Annuler</button>
          <button onClick={handleSaveReservation}>Sauvegarder</button>
        </PopupContainer>
      )}
    </BassinContainer>
  );
};

export default BassinsIndex;
