const express = require('express');
const publicCtrl = require('../controllers/publicCtrl')

const router = express.Router();

router.post('/inscription', publicCtrl.inscription);  // http://localhost:3000/public/inscription
router.post('/connexion', publicCtrl.connexion);   //  http://localhost:3000/public/connexion
router.post('/statressource', publicCtrl.statressource);   //  http://localhost:3000/public/statressource
router.get('/afficheRessource/:ressourceid', publicCtrl.afficheRessource);   //  http://localhost:3000/public/afficheRessource
router.get('/ressourceFiltreTags/:tags', publicCtrl.ressourceFiltreTags);   //  http://localhost:3000/public/ressourceFiltreTags
router.get('/afficheRessourceDeUtilisateur/:userid', publicCtrl.afficheRessourceDeUtilisateur);   //  http://localhost:3000/public/afficheRessourceDeUtilisateur


module.exports = router;