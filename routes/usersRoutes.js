const express = require('express');
const usersCtrl = require('../controllers/usersCtrl')
const auth = require ('../middleware/auth')

const upload = require('../middleware/multerUpload')

// Chargement de la méthode Router du module express
const router = express.Router();

router.get('/afficheRessourceUser', auth.user, usersCtrl.afficheRessourceUser);   // http://localhost:3000/users/afficheRessourceUser
router.get('/afficheOneRessourceUser/:ressourceid', usersCtrl.afficheOneRessourceUser);   //  http://localhost:3000/users/afficheOneRessourceUser
router.post('/testAuth',auth.user, usersCtrl.testAuth);  //http://localhost:3000/users/testAuth
router.post('/createRessource',upload.uploadOneFile.single('file'),usersCtrl.createRessource);   // http://localhost:3000/users/createRessource
router.post('/commente', usersCtrl.commente); //http://localhost:3000/users/commente
router.get('/supprimeRessource', usersCtrl.supprimeRessource); //http://localhost:3000/users/supprimeRessource
router.post('/signalerUneRessource',usersCtrl.signalerUneRessource); //http://localhost:3000/users/signalerUneRessource
router.post('/signalerUnCommentaire', usersCtrl.signalerUnCommentaire); //http://localhost:3000/users/signalerUnCommentaire
router.post('/modifRessource', usersCtrl.modifRessource); //http://localhost:3000/users/modifRessource
router.get('/profilUtilisateur/:userid', usersCtrl.profilUtilisateur); //http://localhost:3000/users/profilUtilisateur
router.post('/favorisRessource', usersCtrl.favorisRessource); //http://localhost:3000/users/favorisRessource
router.get('/afficherFavorisRessource', usersCtrl.afficherFavorisRessource); //http://localhost:3000/users/afficherFavorisRessource
router.post('/suivreUser', usersCtrl.suivreUser); //http://localhost:3000/users/suivreUser
router.post('/supprimerSuivieUser', usersCtrl.supprimerSuivieUser); //http://localhost:3000/users/supprimerSuivieUser
router.post('/supprimerFavorisRessource', usersCtrl.supprimerFavorisRessource); //http://localhost:3000/users/supprimerFavorisRessource
router.get('/afficherSuivreUtilisateur', usersCtrl.afficherSuivreUtilisateur); //http://localhost:3000/users/afficherSuivreUtilisateur
router.get('/monProfil', usersCtrl.monProfil); //http://localhost:3000/users/monProfil
router.post('/modifierMonProfil', usersCtrl.modifierMonProfil); //http://localhost:3000/users/modifierMonProfil

module.exports = router;