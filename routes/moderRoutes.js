const express = require('express');
const moderateurCtrl = require('../controllers/moderateurCtrl')

// Chargement de la méthode Router du module express
const router = express.Router();

router.post('/moderationRessource', moderateurCtrl.moderationRessource);  // http://localhost:3000/moder/moderationRessource
router.post('/moderationComment', moderateurCtrl.moderationComment);  // http://localhost:3000/moder/moderationComment
router.get('/afficheCommentaireSignale', moderateurCtrl.afficheCommentaireSignale);  // http://localhost:3000/moder/afficheCommentaireSignale
router.get('/afficheRessourceModer', moderateurCtrl.afficheRessourceModer);  // http://localhost:3000/moder/afficheRessourceModer
router.get('/afficheRessource/:ressourceid', moderateurCtrl.afficheRessource); //  http://localhost:3000/moder/afficheRessource/
router.get('/afficheRessourceSignale', moderateurCtrl.afficheRessourceSignale);  // http://localhost:3000/moder/afficheRessourceSignale

module.exports = router;