import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Modal from "react-modal";
import moment from "moment";
import "moment/locale/fr";
import Swal from "sweetalert2";
import { MdOutlineArrowForwardIos } from "react-icons/md";

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
  CheckboxBassin,
  Paragraph,
  TextH3,
  ReservedTimeslotsItem,
  LabelBassin,
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
  const [reservations, setReservations] = useState([]);
  const [selectedDates, setSelectedDates] = useState([]);
  const [reservedTimeslots, setReservedTimeslots] = useState([]);
  const [selectedPiscineId, setSelectedPiscineId] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);
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
    console.log("Timeslot", JSON.stringify(timeslot));
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
    const selectedDates = Array.isArray(date) ? date : [date];
    setSelectedDates(selectedDates);
    console.log("Dates :", selectedDates);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleSaveButtonClick = async () => {
    if (selectedBassin && selectedTimeslot && selectedDates.length > 0) {
      setIsPopupOpen(true);

      const reservations = selectedDates.map((date) => ({
        bassinId: selectedBassin.id_bassin,
        piscineId: selectedBassin.id_piscine,
        date: date,
        timeslots: {
          timeslot_id: selectedTimeslot.timeslot_id,
          start_time: selectedTimeslot.start_time,
          end_time: selectedTimeslot.end_time,
        },
        client: clientInfo,
      }));

      console.log("Réservations :", reservations);

      // Envoyer les réservations au serveur et gérer les réponses
    } else {
      console.log(
        "Veuillez sélectionner un bassin, un créneau horaire et au moins une date"
      );
    }
  };

  useEffect(() => {
    const fetchReservations = async () => {
      console.log(
        "Ntmmmmmm " +
          JSON.stringify(selectedDates) +
          "/" +
          id_piscine +
          "/" +
          selectedBassin.id_bassin
      );
      if (selectedDate && selectedBassin) {
        try {
          let dates = [];
          if (Array.isArray(selectedDate)) {
            // Si selectedDate est un tableau de dates
            dates = selectedDate.map((date) =>
              moment(date).format("YYYY-MM-DD")
            );
          } else {
            // Si selectedDate est une seule date
            dates.push(moment(selectedDate).format("YYYY-MM-DD"));
          }

          const requests = dates.map((date) =>
            axios.get(
              `http://localhost:3001/reservations/${date}/${id_piscine}/${selectedBassin.id_bassin}`
            )
          );

          const responses = await Promise.all(requests);
          const data = responses.map((response) => response.data);

          // Concaténer les réservations pour toutes les dates
          const mergedReservations = data.reduce(
            (accumulator, reservations) => [...accumulator, ...reservations],
            []
          );

          setReservations(mergedReservations);

          // Récupérer les créneaux horaires réservés pour le bassin sélectionné
          const reservedTimeslots = mergedReservations.map(
            (reservation) => reservation.timeslotId
          );
          setReservedTimeslots(reservedTimeslots);

          // Afficher les créneaux horaires réservés dans la console
          console.log("Créneaux horaires réservés :", reservedTimeslots);
        } catch (error) {
          // Gérer les erreurs
        }
      }
    };

    fetchReservations();
  }, [selectedDate, selectedBassin]);

  const handleBassinSelection = (bassin) => {
    setSelectedBassin(bassin);
    console.log(bassin.id_bassin);
  };

  const handleSaveReservation = async () => {
    if (selectedBassin && selectedTimeslot) {
      setIsPopupOpen(true);

      if (selectedDates.length === 0) {
        console.log("Veuillez sélectionner au moins une date.");
        return;
      }

      try {
        const reservations = [];

        // Créer une réservation pour chaque date sélectionnée
        selectedDates.forEach((date) => {
          const reservation = {
            bassinId: selectedBassin.id_bassin,
            piscineId: selectedBassin.id_piscine,
            date: moment(date).format("YYYY-MM-DD"),
            timeslots: {
              timeslot_id: selectedTimeslot.timeslot_id,
              start_time: selectedTimeslot.start_time,
              end_time: selectedTimeslot.end_time,
            },
            client: clientInfo,
          };
          reservations.push(reservation);
        });

        const requestBody = {
          reservations: reservations, // Envelopper les réservations dans un objet "reservations"
        };

        const response = await axios.put(
          "http://localhost:3001/save-reservation",
          requestBody, // Utiliser l'objet requestBody contenant les réservations
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
          "Les réservations ont été sauvegardées avec succès.",
          "success"
        );
      } catch (error) {
        console.log(error);
        console.log(error.message);
        console.log(error.response);
      }
    } else {
      console.log("Veuillez sélectionner un bassin et un créneau horaire");
    }
  };

  return (
    <BassinContainer>
      <InfoContainer>
        <TitlePool>
          <h1>{piscine && piscine.nom_piscine}</h1>
        </TitlePool>
        <TimeslotsContainer>
          {piscines &&
          piscines.length > 0 &&
          piscines[0]?.timeslots.length > 0 ? (
            piscines[0].timeslots.map((timeslot, index) => {
              const isReserved = reservedTimeslots.includes(
                timeslot.timeslot_id
              );
              const isSelected = selectedTimeslot === timeslot;
              return (
                <div key={index}>
                  {isReserved ? (
                    <ReservedTimeslotsItem
                      className={`${isSelected && "selected"} ${
                        isReserved ? "reserved" : ""
                      }`}
                      disabled
                    >
                      {timeslot.start_time} - {timeslot.end_time}
                    </ReservedTimeslotsItem>
                  ) : (
                    <TimeslotsItem
                      className={`${isSelected && "selected"} ${
                        isReserved ? "reserved" : ""
                      }`}
                      onClick={() => handleTimeslotSelection(timeslot)}
                    >
                      {timeslot.start_time} - {timeslot.end_time}
                    </TimeslotsItem>
                  )}
                </div>
              );
            })
          ) : (
            <p>No timeslots available</p>
          )}
        </TimeslotsContainer>
        <CalendarContainer>
          <Calendrier handleDateSelection={handleDateSelection} />
        </CalendarContainer>
        <BassinList>
          {bassins && bassins.length > 0 ? (
            bassins.map((bassin) => (
              <ListElement key={bassin._id}>
                <CheckboxBassin
                  selected={
                    selectedBassin &&
                    selectedBassin.id_bassin === bassin.id_bassin
                  }
                  onClick={() => handleBassinSelection(bassin)}
                >
                  <LabelBassin
                    selected={
                      selectedBassin &&
                      selectedBassin.id_bassin === bassin.id_bassin
                    }
                  >
                    {bassin.nom_bassin}
                  </LabelBassin>
                </CheckboxBassin>
              </ListElement>
            ))
          ) : (
            <li>Aucun bassin disponible</li>
          )}
        </BassinList>
        <Button onClick={handleSaveButtonClick}>Sauvegarder</Button>
        <Button onClick={handleSaveReservation}>Réserver</Button>
      </InfoContainer>

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
        <TextH3>Période d'exploitation 2022-2022</TextH3>
        <ul>
          <li className="listItemWithIcon">
            <MdOutlineArrowForwardIos className="listIcon" />
            <Paragraph>Fermeture le dimanche 21 mai 2023</Paragraph>
          </li>
          <li className="listItemWithIcon">
            <MdOutlineArrowForwardIos className="listIcon" />
            <Paragraph>Réouverture dès le mercredi 6 septembre 2023</Paragraph>
          </li>
        </ul>

        <TextH3>Horaires d'ouverture</TextH3>
        <ul>
          <li className="listItemWithIcon">
            <MdOutlineArrowForwardIos className="listIcon" />
            <Paragraph>Lundi: 10h00 - 13h00</Paragraph>
          </li>
          <li className="listItemWithIcon">
            <MdOutlineArrowForwardIos className="listIcon" />
            <Paragraph>Mardi à vendredi: 10h00 - 21h00</Paragraph>
          </li>
        </ul>
      </ContainerRight>
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
