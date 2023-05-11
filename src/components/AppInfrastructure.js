import React, { useEffect, useState } from "react";

function Planification({ infrastructure }) {
  const { saisons } = infrastructure;

  return (
    <div>
      <h3>{infrastructure.nom}</h3>
      {saisons.map((saison) => (
        <div key={saison.nom}>
          <h4>{saison.nom}</h4>
          <ul>
            {saison.regles.map((regle) => (
              <li key={regle.type}>
                {regle.type}: {regle.valeur}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function AppInfrastructure() {
  const [infrastructures, setInfrastructures] = useState([]);

  useEffect(() => {
    fetch("../json/infrastructure.json")
      .then((response) => response.json())
      .then((data) => {
        setInfrastructures(data.infrastructures);
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération des données JSON :",
          error
        );
      });
  }, []);
  console.log(infrastructures);

  function handleFormSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const dateDebut = new Date(formData.get("dateDebut"));
    const dateFin = new Date(formData.get("dateFin"));
    const infrastructureId = parseInt(formData.get("infrastructureId"), 10);
    const infrastructure = infrastructures.find(
      (infrastructure) => infrastructure.id === infrastructureId
    );

    if (!infrastructure) {
      console.error("Infrastructure not found");
      return;
    }

    // Vérification du nombre minimum de personnel requis pour la période donnée
    const nbPersonnelRequis = infrastructure.saisons[0].regles[0].valeur;
    const nbPersonnelSaisi = parseInt(formData.get("nbPersonnel"), 10);

    console.log(nbPersonnelRequis);
    console.log(nbPersonnelSaisi);

    if (nbPersonnelSaisi < nbPersonnelRequis) {
      alert(
        `Le nombre de personnel saisi (${nbPersonnelSaisi}) est inférieur au nombre minimum requis pour cette infrastructure (${nbPersonnelRequis}).`
      );
    } else {
      alert("La planification a été validée avec succès !");
    }
  }

  return (
    <div>
      <h1>Planification des infrastructures</h1>

      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="infrastructureId">Infrastructure :</label>
          <select name="infrastructureId" id="infrastructureId">
            {infrastructures.map((infrastructure) => (
              <option key={infrastructure.id} value={infrastructure.id}>
                {infrastructure.nom}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="dateDebut">Date de début :</label>
          <input type="date" name="dateDebut" id="dateDebut" />
        </div>
        <div>
          <label htmlFor="dateFin">Date de fin :</label>
          <input type="date" name="dateFin" id="dateFin" />
        </div>
        <div>
          <label htmlFor="nbPersonnel">Nombre de personnel :</label>
          <input type="number" name="nbPersonnel" id="nbPersonnel" />
        </div>
        <button type="submit">Valider</button>
      </form>
    </div>
  );
}

export default AppInfrastructure;
