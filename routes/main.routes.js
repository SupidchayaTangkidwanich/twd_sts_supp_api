// // routes/main.routes.js
// const express = require('express');
// const router = express.Router();
// const mainController = require('../controllers/main.controller');

// // สร้างข้อมูลใน sts_table ตามชื่อเส้นทาง
// router.post('/sts_table/leadtime', mainController.createData);
// router.post('/sts_table/barcodeSubscribe', mainController.createData);
// router.post('/sts_table/stockUpdate', mainController.createData);

// // ดึงข้อมูลทั้งหมดจาก sts_table ตามชื่อเส้นทาง
// router.get('/sts_table/leadtime', mainController.findAllData);
// router.get('/sts_table/barcodeSubscribe', mainController.findAllData);
// router.get('/sts_table/stockUpdate', mainController.findAllData);

// // แก้ไขข้อมูลใน sts_table ตาม ID ตามชื่อเส้นทาง
// router.put('/sts_table/leadtime/:id', mainController.updateData);
// router.put('/sts_table/barcodeSubscribe/:id', mainController.updateData);
// router.put('/sts_table/stockUpdate/:id', mainController.updateData);

// // ลบข้อมูลใน sts_table ตาม ID ตามชื่อเส้นทาง
// router.delete('/sts_table/leadtime/:id', mainController.deleteData);
// router.delete('/sts_table/barcodeSubscribe/:id', mainController.deleteData);
// router.delete('/sts_table/stockUpdate/:id', mainController.deleteData);

// module.exports = router;

// routes/main.routes.js
const express = require('express');
const router = express.Router();
const mainController = require('../controllers/main.controller');

// สร้างข้อมูลใน sts_table ทุกชนิด
router.post('/sts_table', mainController.createData);

// ดึงข้อมูลทั้งหมดจาก sts_table ทุกชนิด
router.get('/sts_table', mainController.findAllData);

// แก้ไขข้อมูลใน sts_table ตาม ID ทุกชนิด
router.put('/sts_table/:id', mainController.updateData);

// ลบข้อมูลใน sts_table ตาม ID ทุกชนิด
router.delete('/sts_table/:id', mainController.deleteData);

module.exports = router;

