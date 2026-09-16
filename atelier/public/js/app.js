import { validateMessage, replyTo } from './brain.js';
import { renderMessages } from './view.js';
const formulaire = document.querySelector('#chat-form');
const statut = document.querySelector('#status');
const versionElt = document.querySelector('#version');

const champ = document.querySelector('#message');
const liste = document.querySelector('#messages');
const historique = [];
const sauvegarde = localStorage.getItem('capweb.historique');
const boutonEffacer = document.querySelector('#effacer');
if (sauvegarde) {
  try {
    const donnees = JSON.parse(sauvegarde);
    historique.push(...donnees);
  } catch (erreur) {
    statut.textContent = 'La conversation sauvegardée est invalide.';
  }
}

renderMessages(historique, liste);

boutonEffacer?.addEventListener('click', () => {
if (!confirm('Voulez-vous vraiment effacer la conversation ?')) {
  return;
}

historique.length = 0;
localStorage.removeItem('capweb.historique');
renderMessages(historique, liste);

});

// J1 : interface seule, on bloque l’envoi et on l’explique.
formulaire?.addEventListener('submit', (event) => {
  event.preventDefault();
  const resultat = validateMessage(champ.value);
  if (!resultat.ok) {
    statut.textContent = resultat.error;
    champ.focus();
    return;
  }

  const texte = resultat.value;
  historique.push({
  role: 'user',
  text: texte
});

  const resultatReponse = replyTo(texte);
  const reponse = resultatReponse.ok ? resultatReponse.value : resultatReponse.error;
  historique.push({
  role: 'assistant',
  text: reponse
});

  renderMessages(historique, liste);
  localStorage.setItem('capweb.historique', JSON.stringify(historique));

  champ.value = '';
  statut.textContent = '';
  champ.focus();
});

// Version du serveur local, échec discret si indisponible.
fetch('/version.json', { headers: { accept: 'application/json' } })
  .then((reponse) => (reponse.ok ? reponse.json() : null))
  .then((donnees) => {
    if (donnees && typeof donnees.version === 'string' && versionElt) {
      versionElt.textContent = `version ${donnees.version}`;
    }
  })
  .catch(() => {});
