const RessourcesModel = require('../models/ressourcesModel')
const UsersModel = require('../models/usersModel')
const { DateTime } = require('luxon')
const { ObjectId } = require('mongodb')

// test de github avec merge sur la branche main

exports.afficheRessourceUser = (req,res) => {        
    RessourcesModel.find({idUser: req.headers.userid}, function (err, datas){
        if(datas){
            return res.status(201).json(datas)
        } else {
            console.log(err)
        }
    })
}

exports.afficheOneRessourceUser = (req,res,callback) => { console.log(req.params.ressourceid)
    RessourcesModel.findOne({_id: req.params.ressourceid},function(err,datas){
        if(datas) {
            return res.status(201).json(datas);
        } else {
            return res.status(401).json({ message: "Ressource inexistante" });
        }
    })
}

exports.testAuth = (req,res) => {
    res.status(201).json({message: 'authentification OK'})
}

exports.createRessource = (req,res,callback) =>  {
    UsersModel.findOne({_id: req.headers.userid}, function(err,datas){
        if(datas){
            prenomNomandUser=datas.prenom.concat(' ', datas.nom)
            const date = new Date()
            const newRessource = new RessourcesModel({
                type: req.body.type,
                etatRessource: 'attente',
                prenomNomUser: prenomNomandUser,
                titre: req.body.titre,
                fileName: nameOfFile,
                resume: req.body.resume,
                idUser: req.headers.userid,
                datePublication: date.toLocaleString("fr-FR", {timeZone: 'EUROPE/PARIS'}),
                tags: req.body.tags,
            });
            newRessource.save()
                .then(() => res.status(201).json({ message: 'Ressource enregistrée'}))
                .catch(error => res.status(401).json({ error }));
        } else {
            return res.status(401).json("Utilisateur inconnu ");
        }
    })
}

exports.commente = (req,res,callback) => {
    UsersModel.findOne({_id: req.headers.userid}, function(err,datas){
        if(datas){
            prenomNomandUser=datas.prenom.concat(' ', datas.nom)
            const date = new Date()
            RessourcesModel.findOneAndUpdate({_id: req.body._id},{$push:{commentaires:{
                prenomNomUser: prenomNomandUser,
                datePublicationComment: date.toLocaleString("fr-FR", {timeZone: 'EUROPE/PARIS'}),
                IdUser: req.headers.userid,
                commentaireText : req.body.commentaireText 
            }}}, function(err,datas){
            if(datas){
                return res.status(201).json("Commentaire Ajouté");
            } else {
                return res.status(401).json("Erreur lors de l'ajout du commentaire");
            }
            })
        } else {
            return res.status(401).json("L'utilisateur n'a pas été trouvé");
        }
    })
}

exports.supprimeRessource = (req,res,callback) => {
    RessourcesModel.findOne({_id: req.headers._id}, function(err,datas){
        if(datas){
            UsersModel.findOne({_id: req.headers.userid})
                .then(userId => {
                    if(datas.idUser == userId._id){
                        RessourcesModel.updateOne({_id: req.headers._id},{$set: {etatRessource: 'archive'}},function(err,datas){
                            if(datas){
                                return res.status(201).json("Ressource Archivée");
                            } else {
                                return res.status(401).json("impossible d'archiver la ressource");
                            }
                        })
                    } else {
                        return res.status(401).json("L'utilisateur n'est pas lié à la ressource");
                    }
                })
            } else {
                return res.status(401).json("L'utilisateur n'a pas été trouvé");
            }
    })
}

exports.signalerUneRessource = (req,res,callback) => {
    UsersModel.findOne({_id: req.headers.userid}, function(err,datas){
        if(datas){
            RessourcesModel.findOneAndUpdate({_id: req.body.ressourceid}, {$inc: {"signalement.nbrSignalementRess": 1}}, function(err,datas){
                if(datas){
                    return res.status(201).json({ message: "Ressource signalée" });
                } else {
                    return res.status(401).json({ message: "Ressource pas signaler" });
                }
            })
        } else {
            return res.status(401).json({ message: "L'utilisateur n'a pas été trouvé" });
        }
    })
}

exports.signalerUnCommentaire = (req,res,callback) => {
    UsersModel.findOne({_id: req.headers.userid}, function(err,datas){
        if(datas){
            const date = new Date()
            RessourcesModel.findOneAndUpdate({"commentaires._id": req.body.commentaireid},
                {$inc: {"commentaires.$.nbrSignalementCom": 1}}, function(err,datas){
                if(datas){
                    return res.status(201).json({ message: "Commentaire signalé" });
                } else {
                    return res.status(401).json({ message: "Erreur lors du signalement du commentaire" });
                }
            })
        } else {
            return res.status(401).json({ message: "L'utilisateur n'a pas été trouvé" });
        }
    })
}

exports.modifRessource = (req,res,callback) =>  {
    UsersModel.findOne({_id: req.headers.userid}, function(err,datas){
        if(datas){
            RessourcesModel.find({_id:req.body.ressourceid} ,function (err,datas) {
                if(datas.idUser===req.headers.userId) {
                    const date = new Date()
                    RessourcesModel.findByIdAndUpdate({_id:req.body.ressourceid},
                    { $set: {
                        type : req.body.type ,
                        titre : req.body.titre, 
                        resume : req.body.resume,
                        etatRessource : "attente" ,
                        dateModif : date.toLocaleString("fr-FR", {timeZone: 'EUROPE/PARIS'})
                    }},function (err,datas) {
                        if(datas) {
                            return res.status(201).json({ message: "Modification de la ressource" });
                        } else {
                            return res.status(401).json({ message: "L'utilisateur n'est pas lié à la ressource" });
                        }
                    })
                } else {
                    return res.status(401).json({ message: "Ressource introuvable" });
                }
            })
        } else {
            return res.status(401).json({ message: "L'utilisateur n'a pas été trouvé" });
        }
    })
}

exports.profilUtilisateur = (req,res,callback) => {
    UsersModel.findOne({_id: req.params.userid}, function(err,datas){
        if(datas){
            return res.status(201).json(datas);
        } else {
            return res.status(401).json(err);
        }
    })
}

exports.monProfil = (req,res,callback) => {
    UsersModel.findOne({_id: req.headers.userid}, function(err,datas){
        if(datas){
            return res.status(201).json(datas);
        } else {
            return res.status(401).json(err);
        }
    })
}

exports.favorisRessource = (req,res,callback) => {
    UsersModel.findOneAndUpdate({_id: req.headers.userid},{$push:{ressourcesFavoris: req.body.ressourceid}},function(err,datas){
        if(datas){
            return res.status(201).json({message: "Ressource ajoutée en favoris"});
        } else {
            return res.status(401).json({ message: "Ressource introuvable" });
        }
    })
}

exports.afficherFavorisRessource = (req,res,callback) => {
    UsersModel.findOne({_id: req.headers.userid}, function(err,datas){
        if(datas){
            RessourcesModel.find({_id: datas.ressourcesFavoris},function(err,datas){
                if(datas){
                    return res.status(201).json(datas);
                } else {
                    return res.status(401).json({ message: "L'utilisateur n'a pas de favori" });
                }
            })
        } else {
            return res.status(401).json({ message: "Utilisateur introuvable" });
        }
    })
}

exports.afficherSuivreUtilisateur = (req,res,callback) => {
    UsersModel.findOne({_id: req.headers.userid}, function(err,datas){
        if(datas){
            UsersModel.find({_id: datas.utilisateursSuivis},function(err,datas){
                if(datas){
                    return res.status(201).json(datas);
                } else {
                    return res.status(401).json({ message: "L'utilisateur n'a pas de favori" });
                }
            })
        } else {
            return res.status(401).json({ message: "Utilisateur introuvable" });
        }
    })
}

exports.suivreUser = (req,res,callback) => {
        UsersModel.findOneAndUpdate({_id: req.headers.userid}, {$push :{ utilisateursSuivis: req.body.utilisateursSuivis}}, function(err,datas){
            if(datas){
                return res.status(201).json({ message: "Utilisateur suivi" });
            } else {
                return res.status(401).json({ message: "Utilisateur inexistant" });
            }
})
}

exports.supprimerSuivieUser = (req,res,callback) => {
    UsersModel.findOneAndUpdate({_id: req.headers.userid}, {$pull :{ utilisateursSuivis: req.body.utilisateursSuivis}}, function(err,datas){
        if(datas){
            return res.status(201).json({ message: "Utilisateur n'est plus suivi" });
        } else {
            return res.status(401).json({ message: "Utilisateur inexistant" });
        }
})
}

exports.supprimerFavorisRessource = (req,res,callback) => {
    UsersModel.findOneAndUpdate({_id: req.headers.userid},{$pull:{ressourcesFavoris: req.body.ressourceid}},function(err,datas){
        if(datas){
            return res.status(201).json({message: "Ressource supprimée des favoris"});
        } else {
            return res.status(401).json({ message: "Ressource introuvable" });
        }
    })
}

exports.modifierMonProfil = (req,res,callback) => {
    UsersModel.findOneAndUpdate({_id: req.headers.userid},{$set:{profession: req.body.profession,ville:req.body.ville}},function(err,datas){
        if(datas){
            return res.status(201).json({message: "Votre profil a été modifié"});
        } else {
            return res.status(401).json({ message: "erreur" });
        }
    })
}

