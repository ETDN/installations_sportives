function PlanificationForm({ infrastructures }) {
  const [saison, setSaison] = useState("");
  const [horaireOuverture, setHoraireOuverture] = useState("");

  const handleFormSubmit = (event) => {
    event.preventDefault();

    // Vérifier les règles spécifiques de chaque infrastructure
    const infrastructure = infrastructures.find(
      (infra) => infra.nom === "Piscine"
    );
    const saisonRules = infrastructure.saisons.find(
      (s) => s.nom === saison
    ).regles;

    let isValid = true;

    // Effectuer les vérifications nécessaires
    saisonRules.forEach((regle) => {
      if (regle.type === "nombre_maitres_nageurs") {
        const nombreMaitresNageursRequis = regle.valeur;
        if (nombreMaitresNageursRequis > 0) {
          // Vérifier si le nombre de maîtres nageurs est suffisant
          // pour l'horaire d'ouverture spécifié
          // (implémentation basée sur vos règles spécifiques)
          const nombreMaitresNageursDisponibles = 2; // Exemple : à remplacer par la valeur réelle
          if (nombreMaitresNageursDisponibles < nombreMaitresNageursRequis) {
            isValid = false;
          }
        }
      }
    });

    // Afficher les résultats de la planification
    setResultatPlanification(
      isValid ? "Planification valide" : "Planification invalide"
    );
  };
}

return (
  <form onSubmit={handleFormSubmit}>
    <label>
      Saison:
      <input
        type="text"
        value={saison}
        onChange={(e) => setSaison(e.target.value)}
      />
    </label>

    <label>
      Horaire d'ouverture:
      <input
        type="text"
        value={horaireOuverture}
        onChange={(e) => setHoraireOuverture(e.target.value)}
      />
    </label>

    <button type="submit">Planifier</button>
  </form>
);

export default PlanificationForm;
