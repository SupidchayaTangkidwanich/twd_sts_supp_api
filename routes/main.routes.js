// routes/main.routes.js
const express = require('express');
const router = express.Router();
const mainController = require('../controllers/main.controller');

router.get('/getbarcode', mainController.findAllData);
router.get('/sku', mainController.findSKU)
router.post('/updateAvailable', mainController.UPDATEAva)
router.post('/updateLeadtime', mainController.UPDATELeadtime)
router.post('/postbarcode', mainController.BarcodeData);



module.exports = router;
