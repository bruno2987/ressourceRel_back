const mongoose = require('mongoose');

const usersSchema = mongoose.Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  dateNaissance: { type: String, required: false },
  email: { type: String, required: true, unique: true },
  photo: { type: String, required: false },
  ville: { type: String, required: false },
  profession: { type: String, required: false },
  habilitation: {type: String, enum: ['user','mod','admin','superadmin'],required: true},
  password: { type: String, required: true },
  etat: {
    restreint: { type: Boolean},
    echeance:{} ,
  },
  ressourcesFavoris: [{type: String}],
  utilisateursSuivis: [{type: String}],
  dateDerniereConnexion:{type: Date},
});

module.exports = mongoose.model('users', usersSchema);