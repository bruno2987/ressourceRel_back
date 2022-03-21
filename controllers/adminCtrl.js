const UsersModel = require('../models/usersModel')
const { ObjectId } = require('mongodb')

exports.createAdmin = (req,res,callback) => {
    UsersModel.findOne({_id: req.headers.userid}, function(err,datas){
        if(datas.habilitation == "admin"){
            UsersModel.findOneAndUpdate({email: req.body.email, prenom: req.body.prenom, nom: req.body.nom}, {$set: {habilitation: req.body.habilitation}},{runValidators:true}, function(err,datas){
                if(datas){
                    return res.status(201).json({ message: "Changement d'habilitation validé" });
                } else {
                    return res.status(401).json({ message: "Utilisateur inconnu" });
                }
            })
        } else {
            return res.status(401).json({ message: "Habilitation nécessaire" });
        }
    })
}

exports.banUser = (req,res,callback) => {
    UsersModel.findOne({_id: req.headers.userid}, function(err,datas){
        if(datas.habilitation == "admin"){
            UsersModel.findOneAndUpdate({email: req.body.email, prenom: req.body.prenom, nom: req.body.nom}, {$set: {etat: {restreint: true, echeance: req.body.echeance}}}, function(err,datas){
                if(datas){
                    return res.status(201).json({ message: "Utilisateur Banni" });
                } else {
                    return res.status(401).json({ message: "Utilisateur inconnu" });
                }
            })
        } else {
            return res.status(401).json({ message: "Habilitation nécessaire" });
        }
    })
}