// controllers/stockUpdate.controller.js
const db = require('../models');
const StockUpdate = db.stockUpdate;

// สร้าง StockUpdate
exports.create = (req, res) => {
  // ดึงข้อมูลจาก body ของคำขอ
  const { sp_code, barcode, qty } = req.body;

  // สร้าง StockUpdate
  StockUpdate.create({
    sp_code: sp_code,
    barcode: barcode,
    qty: qty,
  })
    .then(stockUpdate => {
      res.send(stockUpdate);
      res.status(200).json({
        code:200
        ,message: 'OK'
        ,datetime: new Date().toISOString()
      })
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'เกิดข้อผิดพลาดในการสร้าง StockUpdate'
      });
    });
};

// ดึงข้อมูลทั้งหมดของ StockUpdates
exports.findAll = (req, res) => {
  StockUpdate.findAll()
    .then(stockUpdates => {
      res.send(stockUpdates);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'เกิดข้อผิดพลาดในการดึงข้อมูล StockUpdates'
      });
    });
};

// ดึงข้อมูล StockUpdate ตาม ID
exports.findOne = (req, res) => {
  const id = req.params.id;

  StockUpdate.findByPk(id)
    .then(stockUpdate => {
      if (!stockUpdate) {
        res.status(404).send({
          message: `ไม่พบ StockUpdate ที่มี ID=${id}`
        });
      } else {
        res.send(stockUpdate);
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `เกิดข้อผิดพลาดในการค้นหา StockUpdate ที่มี ID=${id}`
      });
    });
};

// อัปเดต StockUpdate ตาม ID
exports.update = (req, res) => {
  const id = req.params.id;

  StockUpdate.findByPk(id)
    .then(stockUpdate => {
      if (!stockUpdate) {
        res.status(404).send({
          message: `ไม่พบ StockUpdate ที่มี ID=${id}`
        });
      } else {
        // ดึงข้อมูลใหม่จาก body ของคำขอ
        const { sp_code, barcode, qty } = req.body;

        // อัปเดตข้อมูล StockUpdate
        stockUpdate.sp_code = sp_code;
        stockUpdate.barcode = barcode;
        stockUpdate.qty = qty;

        stockUpdate.save()
          .then(() => {
            res.send({ message: 'อัปเดต StockUpdate สำเร็จ' });
          })
          .catch(err => {
            res.status(500).send({
              message: err.message || `เกิดข้อผิดพลาดในการอัปเดต StockUpdate ที่มี ID=${id}`
            });
          });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `เกิดข้อผิดพลาดในการค้นหา StockUpdate ที่มี ID=${id}`
      });
    });
};

// ลบ StockUpdate ตาม ID
exports.delete = (req, res) => {
  const id = req.params.id;

  StockUpdate.findByPk(id)
    .then(stockUpdate => {
      if (!stockUpdate) {
        res.status(404).send({
          message: `ไม่พบ StockUpdate ที่มี ID=${id}`
        });
      } else {
        stockUpdate.destroy()
          .then(() => {
            res.send({ message: 'ลบ StockUpdate สำเร็จ' });
          })
          .catch(err => {
            res.status(500).send({
              message: err.message || `เกิดข้อผิดพลาดในการลบ StockUpdate ที่มี ID=${id}`
            });
          });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `เกิดข้อผิดพลาดในการค้นหา StockUpdate ที่มี ID=${id}`
      });
    });
};
