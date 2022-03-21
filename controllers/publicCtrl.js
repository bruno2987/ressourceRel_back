const UsersModel = require('../models/usersModel')
const RessourcesModel = require('../models/ressourcesModel')
const dotenv = require('dotenv');  // permet d'utiliser un fichier .env
dotenv.config();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {DateTime} = require("luxon");

exports.inscription = (req,res,callback) =>  {
    UsersModel.findOne({email: req.body.email})
        .then(user=> {console.log(user)
            if(user !== null) {res.status(403).json({erreur:'Addresse mail déjà connue'})}
            else {
                bcrypt.hash(req.body.password, 10)
                .then ( passwordHashed => {
                    const newUser = new UsersModel({
                        nom: req.body.nom,
                        prenom: req.body.prenom,
                        email: req.body.email,
                        password: passwordHashed,
                        habilitation: 'user',
                        dateDerniereConnexion: DateTime.now().toISO()
                    });
                    newUser.save()
                        .then(() => res.status(201).json({ message: 'Inscription enregistrée'}))
                        .catch(error => res.status(400).json({ error }));
                })
            }
        })
}


exports.connexion = (req,res,callback) => {
    UsersModel.findOne({"email": req.body.email}, function(err,datas){
        if (!datas){
            return res.status(401).json({ message: "L'adresse mail n'existe pas" });
        } else {
            bcrypt.compare(req.body.password, datas.password)
            .then ( valid => {
                if(!valid) {
                    return res.status(401).json({message: "Mot de passe incorrect"});
                }
                res.status(200).json({
                    message: 'connexion réussie',
                    userId: datas._id,
                    habilitation: datas.habilitation,
                    token: jwt.sign(
                        {userId: datas._id},
                        process.env.TOKEN_KEY,
                        {expiresIn: '2h'}
                    ),
                    habilitation: datas.habilitation
                })
            })
        }
    })
}

exports.statressource = (req,res,callback) => {
    UsersModel.findOne({_id: req.headers.userid}, function(err,datas){
        if(datas) {
            RessourcesModel.findOneAndUpdate({_id: req.body.ressourceid}, {$inc: {"stats.vuesConnecte": 1}}, function(err,datas){
                if(datas){
                    return res.status(201).json({ message: "VUE + 1 connecté" });
                } else {
                    return res.status(401).json({ message: "Ressource inexistante" });
                }
            })
        } else {
            RessourcesModel.findOneAndUpdate({_id: req.body.ressourceid}, {$inc: {"stats.vuesnonConnecte": 1}}, function(err,datas){
                if(datas){
                    return res.status(201).json({ message: "VUE + 1 non connecté" });
                } else {
                    return res.status(401).json({ message: "Ressource inexistante" });
                }
            })
        }
    })       
}
exports.afficheRessource = (req,res,callback) => {
    RessourcesModel.findOne({_id: req.params.ressourceid , etatRessource: 'valide'},function(err,datas){
        if(datas) {
            return res.status(201).json(datas);
        } else {
            return res.status(401).json({ message: "Ressource inexistante" });
        }
    })
}

exports.ressourceFiltreTags = (req,res) => {        
    RessourcesModel.find({tags: req.params.tags, etatRessource: 'valide'}, function (err, datas){
        if(datas){
            return res.status(201).json(datas)
        } else {
            return res.status(401).json({ message: "Ressource tagsFiltre inexistant" });
        }
    })
}

exports.afficheRessourceDeUtilisateur = (req,res,callback) => {
    RessourcesModel.find({idUser: req.params.userid , etatRessource: 'valide'},function(err,datas){
        if(datas) {
            return res.status(201).json(datas);
        } else {
            return res.status(401).json({ message: "Ressource inexistante" });
        }
    })
}
