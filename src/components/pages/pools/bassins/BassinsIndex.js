import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import {
  H1,
  Icon,
  List,
  ListElement,
  Paragraph,
  Titre,
} from "../../infrastructures/InfrastructureElement";
import {
  BassinContainer,
  CalendarContainer,
  ContainerImg,
  DescriptionContainer,
} from "./BassinElement";
import { IconGym } from "../../gyms/salles/SalleElement";
import CalendarTemplate from "../../../calendar";

const BassinsIndex = () => {
  const { id_piscine } = useParams();
  const [piscine, setPiscine] = useState(null);
  const [bassins, setBassins] = useState([]);
  const [piscines, setPiscines] = useState(null);

  const [availability, setAvailability] = useState([]);
  const Calendar = CalendarTemplate({
    availability,
    setAvailability,
  });

  useEffect(() => {
    // Récupérer les détails de la piscine en fonction de l'ID dans l'URL depuis votre backend
    const fetchPiscine = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/piscines/${id_piscine}?_embed=bassins`
        );
        const data = response.data;
        setPiscine(data);
        // Accéder aux bassins à partir de la propriété "bassinsInfo" dans les données
        setBassins(data.bassinsInfo); // Update this line
        setPiscines(data.piscinesInfo);

        console.log("Données bassins : ", data.bassinsInfo);
      } catch (error) {
        // Gérer les erreurs
      }
    };

    fetchPiscine();
  }, [id_piscine]);

  if (!piscine) {
    return <div>Loading...</div>;
  }

  return (
    <BassinContainer>
      <ContainerImg>
        <Titre>{piscine.nom_piscine}</Titre>
        <IconGym
          src={piscines && piscines.length > 0 ? piscines[0].image : ""}
        />

        {/* <List>
          {bassins && bassins.length > 0 ? (
            bassins.map((bassin) => (
              <ListElement key={bassin._id}>{bassin.nom_bassin}</ListElement>
            ))
          ) : (
            <ListElement>Aucune salle disponible</ListElement>
          )}
        </List> */}
        <DescriptionContainer>
          <Paragraph>
            {" "}
            {piscines && piscines.length > 0
              ? piscines[0].description
              : "No description available"}
          </Paragraph>
        </DescriptionContainer>
      </ContainerImg>
      <CalendarContainer>
        <Calendar
          availability={availability}
          setAvailability={setAvailability}
          primaryColor="#DF1B1B"
          secondaryColor="#47b2a2"
          fontFamily="Roboto"
          fontSize={12}
          primaryFontColor="#222222"
          startTime="8:00"
          endTime="22:00"
        />
      </CalendarContainer>
    </BassinContainer>
  );
};

export default BassinsIndex;
