const mongoose = require('mongoose');

const ressourceSchema = mongoose.Schema({
  type: { type: String, required: false },
  etatRessource: { type: String,enum: ['attente','valide','archive'], required: false },// etat possible : attente, invisible, accepter, refuser
  titre: { type: String, required: false },
  fileName: {type: String, required: false},
  resume: { type: String, required: false },
  idUser: { type: String, required: false },
  prenomNomUser: { type: String, required: false },
  datePublication: { type: String, required: false },
  dateValidation: { type: String, required: false },
  dateModif: { type: String, required: false },
  tags: { type: String, required: false },
  commentaires: [{
    IdUser: { type: String, required: false },
    prenomNomUser: { type: String, required: false },
    datePublicationComment: { type: String, required: false },
    nbrSignalementCom: {type: Number,default:0},
    signalementCom: {
      tableSignalement: 
        [{
          signalementComment: { type: Boolean, required: false },
          motif: { type: String, required: false },
          dateSignalement: { type: String, required: false },
        }],
      },
    commentaireText: { type: String, required: false },
  }],
  stats: {
    vuesnonConnecte: { type: Number, default:0,required: false },
    vuesConnecte: { type: Number,default:0, required: false },
    suivis: { type: Number, required: false },
  },
  signalement: {
    nbrSignalementRess: {type: Number, default:0},
    tableSignalement: 
      [{
        signalementRessource: { type: Boolean, required: false },
        motif: { type: String, required: false },
        dateSignalement: { type: String, required: false },
      }],
    },
});

module.exports = mongoose.model('ressource', ressourceSchema);