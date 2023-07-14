import React, { useEffect, useState } from "react";
import axios from "axios";
import "moment/locale/fr";
import moment from "moment";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import {
  BassinContainer,
  BassinList,
  Button,
  ButtonBassin,
  CalendarContainer,
  ContainerRight,
  InfoContainer,
  LabelBassin,
  ListElement,
  Paragraph,
  PopupContainer,
  ReservedTimeslotsItem,
  TextH3,
  TimeslotsContainer,
  TimeslotsItem,
  TitlePool,
  WrapperDescription,
  WrapperImg,
} from "./BassinElement";
import Calendrier from "../../../calendar/calendrier";
import { IconGym } from "../../gyms/salles/SalleElement";
import { MdOutlineArrowForwardIos } from "react-icons/md";

const BassinsIndex = () => {
  const { id_piscine } = useParams();
  const [piscine, setPiscine] = useState([]);
  const [selectedDates, setSelectedDates] = useState([]);
  const [selectedTimeslot, setSelectedTimeslot] = useState(null);
  const [reservedTimeslots, setReservedTimeslots] = useState([]);
  const [bassins, setBassins] = useState([]);
  const [selectedBassin, setSelectedBassin] = useState(null);
  const [timeslots, setTimeslots] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [clientInfo, setClientInfo] = useState({
    nom: "",
    adresse: "",
    telephone: "",
  });

  useEffect(() => {
    const fetchPiscine = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/piscines/${id_piscine}`
        );
        const data = response.data;
        setPiscine(data);
        setBassins(data.bassins);
        setTimeslots(data.timeslots);
      } catch (error) {
        // Gérer les erreurs
      }
    };

    fetchPiscine();
  }, [id_piscine]);

  useEffect(() => {
    const fetchReservations = async () => {
      if (selectedDates.length === 0 || !selectedBassin) {
        return;
      }

      const formattedDates = selectedDates.map((date) =>
        moment(date).subtract(1, "month").format("YYYY-MM-DD")
      );

      console.log("Formatted dates: " + formattedDates);

      try {
        const responses = await Promise.all(
          formattedDates.map((date) =>
            axios.get(
              `http://localhost:3001/reservations/${id_piscine}/${selectedBassin.id_bassin}/${date}`
            )
          )
        );

        console.log(
          "Reponses : " +
            id_piscine +
            "/" +
            selectedBassin.id_bassin +
            "/" +
            formattedDates
        );

        const reservedTimeslots = responses.reduce((accumulator, response) => {
          const reservations = response.data;
          const timeslots = reservations.map(
            (reservation) => reservation.timeslot
          );
          const timeslotIds = timeslots.map((timeslot) => timeslot.timeslot_id);

          return accumulator.concat(timeslotIds);
        }, []);

        setReservedTimeslots(reservedTimeslots);
      } catch (error) {
        console.log(error);
      }
    };

    fetchReservations();
  }, [selectedDates, selectedBassin, id_piscine]);

  if (!piscine) {
    return <div>Loading...</div>;
  }

  const handleClientInfoChange = (event) => {
    const { name, value } = event.target;
    setClientInfo((prevClientInfo) => ({
      ...prevClientInfo,
      [name]: value,
    }));
  };

  const handleDateSelection = (date) => {
    const selectedDates = Array.isArray(date) ? date : [date];
    setSelectedDates(selectedDates);
    console.log("Datessss :", selectedDates);
  };

  const handleBassinSelection = (bassin) => {
    setSelectedBassin(bassin);
    console.log(bassin.id_bassin);
  };

  const handleTimeslotSelection = (timeslot) => {
    setSelectedTimeslot(timeslot);
    console.log("Timeslot", JSON.stringify(timeslot));
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleSaveButtonClick = async () => {
    if (selectedBassin && selectedTimeslot && selectedDates.length > 0) {
      setIsPopupOpen(true);

      const reservations = selectedDates.map((date) => ({
        bassinId: selectedBassin.id_bassin,
        piscineId: id_piscine,
        date: selectedDates,
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

  const handleSaveReservation = async () => {
    if (selectedBassin && selectedTimeslot) {
      setIsPopupOpen(true);

      if (selectedDates.length === 0) {
        console.log("Veuillez sélectionner au moins une date.");
        return;
      }

      try {
        const requestBody = {
          piscineId: id_piscine,
          bassinId: selectedBassin.id_bassin,
          dates: selectedDates.map((date) => moment(date).format("YYYY-MM-DD")),
          timeslot: {
            timeslot_id: selectedTimeslot.timeslot_id,
            start_time: selectedTimeslot.start_time,
            end_time: selectedTimeslot.end_time,
          },
          client: clientInfo,
        };

        await axios.put("http://localhost:3001/save-reservation", requestBody, {
          headers: {
            "Content-Type": "application/json",
          },
        });

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
          <h1 style={{ color: "white" }}>{piscine.nom_piscine}</h1>
        </TitlePool>
        <TimeslotsContainer>
          {timeslots && timeslots.length > 0 ? (
            timeslots.map((timeslot, index) => {
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
              <ListElement key={bassin.id_bassin}>
                <ButtonBassin
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
                </ButtonBassin>
              </ListElement>
            ))
          ) : (
            <li>Aucun bassin disponible</li>
          )}
        </BassinList>
        <Button onClick={handleSaveButtonClick}>Sauvegarder</Button>
      </InfoContainer>

      <ContainerRight>
        <WrapperDescription>
          <WrapperImg>
            <IconGym src={piscine.image} alt={piscine.nom_piscine} />
          </WrapperImg>
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
