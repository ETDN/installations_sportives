import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  List,
  ListElement,
  Paragraph,
  Titre,
} from "../../infrastructures/InfrastructureElement";
import { ContainerImg, ContainerSalle, IconGym } from "./SalleElement";

const SallesIndex = () => {
  const [salles, setSalles] = useState([]);

  useEffect(() => {
    const fetchSalles = async () => {
      try {
        const response = await axios.get("http://localhost:3001/salles");
        const data = response.data;
        setSalles(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSalles();
  }, []);

  console.log("Salles:", salles);

  return (
    <ContainerSalle>
      <Titre>Salles de gym</Titre>
      <Paragraph>
        Sierre dispose d’une quinzaine de salles de gym situées aux quatre
        points cardinaux de la ville
      </Paragraph>
      <ContainerImg>
        <IconGym src="https://storage.googleapis.com/infrastructures_sportives/gyms.jpeg" />
      </ContainerImg>
      <List>
        {salles && salles.length > 0 ? (
          salles.map((salle) => (
            <ListElement key={salle._id}>
              {salle.nom_salle} {salle.utilisation}
            </ListElement>
          ))
        ) : (
          <ListElement>Aucune salle disponible</ListElement>
        )}
      </List>
    </ContainerSalle>
  );
};

export default SallesIndex;
