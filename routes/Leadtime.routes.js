
const express = require('express');
const router = express.Router();
const LeadtimeController = require('../controllers/Leadtime.controller');

// สร้าง 
router.post('/', LeadtimeController.create);

// ดึงข้อมูลทั้งหมดของ
router.get('/', LeadtimeController.findAll);

// ดึงข้อมูล Leadtime ตาม ID
router.get('/:id', LeadtimeController.findOne);

// อัปเดต Leadtime ตาม ID
router.put('/:id', LeadtimeController.update);

// ลบ Leadtime ตาม ID
router.delete('/:id', LeadtimeController.delete);

module.exports = router;
