// routes/stockUpdate.routes.js
const express = require('express');
const router = express.Router();
const stockUpdateController = require('../controllers/stockUpdate.controller');

// สร้าง StockUpdate
router.post('/', stockUpdateController.create);

// ดึงข้อมูลทั้งหมดของ StockUpdates
router.get('/', stockUpdateController.findAll);

// ดึงข้อมูล StockUpdate ตาม ID
router.get('/:id', stockUpdateController.findOne);

// อัปเดต StockUpdate ตาม ID
router.put('/:id', stockUpdateController.update);

// ลบ StockUpdate ตาม ID
router.delete('/:id', stockUpdateController.delete);

module.exports = router;
