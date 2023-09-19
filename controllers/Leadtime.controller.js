// controllers/leadtime.controller.js
const db = require('../models');
const Leadtime = db.leadtime;

function getCurrentDatetime() {
  const currentDate = new Date();
  const timeZoneOffset = currentDate.getTimezoneOffset(); // ค่า offset ของโซนเวลาในนาที
  currentDate.setMinutes(currentDate.getMinutes() - timeZoneOffset); // ปรับเวลาตาม offset

  const formattedDatetime = currentDate.toISOString().slice(0, 19).replace("T", " ");

  return formattedDatetime;
}

// สร้าง Leadtime
exports.create = (req, res) => {
  const { sp_code, barcode, leadtime } = req.body;

  Leadtime.create({
    sp_code: sp_code,
    barcode: barcode,
    leadtime: leadtime,
  })
  
    .then(leadtime => {
      res.status(200).json({
        code: 200,
        message: 'OK',
        error: "",
        datetime: getCurrentDatetime()
      });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'เกิดข้อผิดพลาดในการสร้าง Leadtime',
      });
    });
};

// ดึงข้อมูลทั้งหมดของ Leadtime
exports.findAll = (req, res) => {
  Leadtime.findAll()
    .then(leadtimes => {
      res.send(leadtimes);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'เกิดข้อผิดพลาดในการดึงข้อมูล Leadtime',
      });
    });
};

// ดึงข้อมูล Leadtime ตาม ID
exports.findOne = (req, res) => {
  const id = req.params.id;

  Leadtime.findByPk(id)
    .then(leadtime => {
      if (!leadtime) {
        res.status(404).send({
          message: `ไม่พบ Leadtime ที่มี ID=${id}`,
        });
      } else {
        res.send(leadtime);
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `เกิดข้อผิดพลาดในการค้นหา Leadtime ที่มี ID=${id}`,
      });
    });
};

// อัปเดต Leadtime ตาม ID
exports.update = (req, res) => {
  const id = req.params.id;

  Leadtime.findByPk(id)
    .then(leadtime => {
      if (!leadtime) {
        res.status(404).send({
          message: `ไม่พบ Leadtime ที่มี ID=${id}`,
        });
      } else {
        const { sp_code, barcode, leadtime } = req.body;

        leadtime.sp_code = sp_code;
        leadtime.barcode = barcode;
        leadtime.leadtime = leadtime;

        leadtime.save()
          .then(() => {
            res.send({ message: 'อัปเดต Leadtime สำเร็จ' });
          })
          .catch(err => {
            res.status(500).send({
              message: err.message || `เกิดข้อผิดพลาดในการอัปเดต Leadtime ที่มี ID=${id}`,
            });
          });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `เกิดข้อผิดพลาดในการค้นหา Leadtime ที่มี ID=${id}`,
      });
    });
};

// ลบ Leadtime ตาม ID
exports.delete = (req, res) => {
  const id = req.params.id;

  Leadtime.findByPk(id)
    .then(leadtime => {
      if (!leadtime) {
        res.status(404).send({
            message: `ไม่พบ Leadtime ที่มี ID=${id}`
        });
      } else {
        leadtime.destroy()
          .then(() => {
            res.send({ message: 'ลบ Leadtime สำเร็จ' });
          })
          .catch(err => {
            res.status(500).send({
              message: err.message || `เกิดข้อผิดพลาดในการลบ Leadtime ที่มี ID=${id}`
            });
          });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `เกิดข้อผิดพลาดในการค้นหา Leadtime ที่มี ID=${id}`
      });
    });
};

