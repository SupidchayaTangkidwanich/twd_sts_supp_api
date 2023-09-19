
const express = require('express');
const router = express.Router();
const barcodeController = require('../controllers/barcode.controller');

// สร้าง 
router.post('/', barcodeController.create);

// ดึงข้อมูลทั้งหมดของ
router.get('/', barcodeController.findAll);

// ดึงข้อมูล Leadtime ตาม ID
router.get('/:sp_code', barcodeController.findOne);

// อัปเดต Leadtime ตาม ID
router.put('/:sp_code', barcodeController.update);

// ลบ Leadtime ตาม ID
router.delete('/:sp_code', barcodeController.delete);

module.exports = router;
