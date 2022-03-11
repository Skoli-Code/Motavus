import Configuration from "./entites/configuration";
import PanelManager from "./panelManager";
import Sauvegardeur from "./sauvegardeur";

export default class ReglesPanel {
  private readonly _panelManager: PanelManager;
  private readonly _rulesBouton: HTMLElement;

  public constructor(panelManager: PanelManager) {
    this._panelManager = panelManager;
    this._rulesBouton = document.getElementById("configuration-regles-bouton") as HTMLElement;

    this._rulesBouton.addEventListener(
      "click",
      (() => {
        this.afficher();
      }).bind(this)
    );
  }

  public afficher(): void {
    let titre = "Règles";
    let contenu =
      "<p>" +
      "Vous avez six essais pour deviner le mot du jour, entre 5 et 12 lettres, commun à tous.<br />" +
      "Vous ne pouvez proposer que des mots commençant par la même lettre que le mot recherché, et qui se trouvent dans notre dictionnaire.<br />" +
      "Le mot change chaque jour. Évitez donc les spoils et privilégiez le bouton de partage.<br />" +
      "</p>" +
      '<div class="grille">' +
      "<table>" +
      "<tr>" +
      '<td class="resultat bien-place">S</td>' +
      '<td class="resultat non-trouve">A</td>' +
      '<td class="resultat non-trouve">L</td>' +
      '<td class="resultat mal-place">U</td>' +
      '<td class="resultat mal-place">T</td>' +
      "</tr>" +
      "</table>" +
      "Les lettres entourées d'un carré rouge sont à la bonne gâche,<br />" +
      "les lettres entourées d'un cercle jaune sont mal placées (mais présentes dans le mot).<br />" +
      "Les lettres qui restent sur fond bleu ne sont pas dans le mot.<br />" +
      "</div>" +
      "<p>" +
      "Jeu largement inspiré de l'excellent <a target='_blank' href='https://framagit.org/JonathanMM/sutom'>SUTOM</a>, et du non moins brillant <a target='_blank' href='https://motchus.fr/'>MOTCHUS</a>"
      'En cas de soucis, vous pouvez contacter <a href="https://twitter.com/AgenceSkoli">@AgenceSkoli</a> sur twitter. −' +
      'Avec nos remerciements à <a target="_blank" href="https://www.linkedin.com/in/enzo-l%C3%A9onard-%F0%9F%8C%B1-5aa1a9139/?originalSubdomain=fr">Enzo</a>' +
      "Avec l'aide de l'excellent dictionnaire lyonnais <a target='_blank' href='http://parlerlyon.free.fr/'>ParlerLyon</a>" +
      'Basé sur l\'excellent <a target="_blank" href="https://www.powerlanguage.co.uk/wordle/">Wordle</a> et le regretté Motus.<br />' +
      "</p>";

    this._panelManager.setContenu(titre, contenu);
    this._panelManager.setClasses(["regles-panel"]);
    this._panelManager.setCallbackFermeture(() => {
      Sauvegardeur.sauvegarderConfig({
        ...(Sauvegardeur.chargerConfig() ?? Configuration.Default),
        afficherRegles: false,
      });
    });
    this._panelManager.afficherPanel();
  }
}
