const UsersModel = require('../models/usersModel')
const RessourcesModel = require('../models/ressourcesModel')
const { DateTime } = require('luxon')
const { find } = require('../models/ressourcesModel')

exports.moderationRessource = (req,res,callback) => {
    UsersModel.findOne({_id: req.headers.userid}, function(err,datas){
        if(datas.habilitation == "admin" || datas.habilitation == "mod"){
            const date = new Date()
            RessourcesModel.findOneAndUpdate({_id: req.body.ressourceid}, {$set: {
                dateValidation: date.toLocaleString("fr-FR", {timeZone: 'EUROPE/PARIS'}),
                etatRessource: req.body.etatRessource}},{runValidators:true}, function(err,datas){
                if(datas){
                    return res.status(201).json({ message: "Ressource validée" });
                } else if(req.body.etatRessource="annulerSignalement") {
                    RessourcesModel.findOneAndUpdate({_id: req.body.ressourceid},{$set:{"signalement.nbrSignalementRess":0}},function(err,datas){
                        if(datas){
                            return res.status(201).json({ message: "signalement de la ressource annuler" });
                        } else {
                            return res.status(401).json({ message: "imposible d'annuler le signalement" });
                        }
                    })
                } else {
                    return res.status(401).json({ message: "Ressource inconnue" });
                }
            })
        } else {
            return res.status(401).json({ message: "Habilitation nécessaire" });
        }
    })
}

exports.moderationComment = (req,res,callback) => {
    UsersModel.findOne({_id: req.headers.userid}, function(err,datas){
        if(datas.habilitation == "admin" || datas.habilitation == "mod"){
            RessourcesModel.findOneAndUpdate({"commentaires._id": req.body.commentaireid},{$pull: {commentaires: {_id: req.body.commentaireid}}}, function(err,datas){
                if(datas){
                    return res.status(201).json({ message: "Commentaire Supprimé" });
                } else {
                    return res.status(401).json({ message: "Commentaire inconnu" });
                }
            })
        } else {
            return res.status(401).json({ message: "Habilitation nécessaire" });
        }
    })
}

exports.afficheRessourceModer = (req,res) => { 
    UsersModel.findOne({_id: req.headers.userid}, function(err,datas){  
        if(datas.habilitation == "admin" || datas.habilitation == "mod"){           
            RessourcesModel.find()
            .where({etatRessource : 'attente'})
            .sort({datePublication: 'ASC'})
            .exec()
            .then(doc => {
                res.status(200).json(doc);
            })
            .catch(err => {
                res.status(401).json({ message: "Aucune ressource signalée" });
            })
        } else {
            return res.status(401).json({ message: "Habilitation nécessaire" });
        }
})
}

exports.afficheCommentaireSignale = (req,res,callback) => {
    UsersModel.findOne({_id: req.headers.userid}, function(err,datas){
        if(datas.habilitation == "admin" || datas.habilitation == "mod"){
            RessourcesModel.aggregate([{ 
                $unwind:{path:"$commentaires"}},
                {$match:{"commentaires.nbrSignalementCom": {$gte:5}}},
                {$group:{"_id":"$_id",'commentaires': {'$push': '$commentaires'}}}
        ])
            .then(doc=>{
                res.status(201).json(doc)
            })
            .catch(err=>{
                res.status(401).json({ message: "Auncun commentaire signalé" });
            })
        } else {
            return res.status(401).json({ message: "Habilitation nécessaire" });
        }
})
}

exports.afficheRessource = (req,res,callback) => {
    RessourcesModel.findOne({_id: req.params.ressourceid},function(err,datas){
        if(datas) {
            return res.status(201).json(datas);
        } else {
            return res.status(401).json({ message: "Ressource inexistante" });
        }
    })
}
exports.afficheRessourceSignale = (req,res,callback) => {
    RessourcesModel.find({"signalement.nbrSignalementRess":{$gte:5}},function(err,datas){
        if(datas){
            return res.status(201).json(datas);
        } else {
            return res.status(401).json({ message: "Aucune Ressource signalé" });
}
})
}