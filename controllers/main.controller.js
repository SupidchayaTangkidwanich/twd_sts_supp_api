// controllers/main.controller.js
const db = require('../models/main.model');
const StsTable = db.sts_table;

function getCurrentDatetime() {
  const currentDate = new Date();
  const timeZoneOffset = currentDate.getTimezoneOffset();
  currentDate.setMinutes(currentDate.getMinutes() - timeZoneOffset);
  const formattedDatetime = currentDate.toISOString().slice(0, 19).replace("T", " ");
  return formattedDatetime;
}

// สร้างข้อมูลในตาราง sts_table
exports.createData = (req, res) => {
  const { sp_code, barcode, leadtime, status, qty } = req.body;

  StsTable.create({
    sp_code: sp_code,
    barcode: barcode,
    leadtime: leadtime,
    status: status,
    qty: qty,
  })
    .then(data => {
      res.status(200).json({
        code: 200,
        message: 'OK',
        error: "",
        datetime: getCurrentDatetime(),
      });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'เกิดข้อผิดพลาดในการสร้างข้อมูลใน sts_table',
      });
    });
};

// ดึงข้อมูลทั้งหมดจากตาราง sts_table
exports.findAllData = (req, res) => {
  StsTable.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'เกิดข้อผิดพลาดในการดึงข้อมูลจาก sts_table',
      });
    });
};

// แก้ไขข้อมูลในตาราง sts_table ตาม ID
exports.updateData = (req, res) => {
  const { id } = req.params;
  const { sp_code, barcode, leadtime, status, qty } = req.body;

  StsTable.update({
    sp_code: sp_code,
    barcode: barcode,
    leadtime: leadtime,
    status: status,
    qty: qty,
  }, {
    where: { id: id }
  })
    .then(data => {
      res.status(200).json({
        code: 200,
        message: 'OK',
        error: "",
        datetime: getCurrentDatetime(),
      });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'เกิดข้อผิดพลาดในการอัปเดตข้อมูลใน sts_table',
      });
    });
};

// ลบข้อมูลในตาราง sts_table ตาม ID
exports.deleteData = (req, res) => {
  const { id } = req.params;

  StsTable.destroy({
    where: { id: id }
  })
    .then(data => {
      if (data === 1) {
        res.status(200).json({
          code: 200,
          message: 'OK',
          error: "",
          datetime: getCurrentDatetime(),
        });
      } else {
        res.status(404).json({
          code: 404,
          message: 'Not Found',
          error: "",
          datetime: getCurrentDatetime(),
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'เกิดข้อผิดพลาดในการลบข้อมูลใน sts_table',
      });
    });
};
