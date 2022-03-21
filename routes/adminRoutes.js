const express = require('express');
const adminCtrl = require('../controllers/adminCtrl')

// Chargement de la méthode Router du module express
const router = express.Router();

router.post('/createAdmin', adminCtrl.createAdmin);  // http://localhost:3000/admin/createAdmin
router.post('/banUser', adminCtrl.banUser);  // http://localhost:3000/admin/banUser

module.exports = router;