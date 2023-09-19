
const db = require('../models');
const BarcodeSubscribe = db.barcodeSubscribe;

function getCurrentDatetime() {
  const currentDate = new Date();
  const timeZoneOffset = currentDate.getTimezoneOffset(); // ค่า offset ของโซนเวลาในนาที
  currentDate.setMinutes(currentDate.getMinutes() - timeZoneOffset); // ปรับเวลาตาม offset

  const formattedDatetime = currentDate.toISOString().slice(0, 19).replace("T", " ");

  return formattedDatetime;
}

// สร้าง BarcodeSubscribe
exports.create = (req, res) => {
  // ดึงข้อมูลจาก body ของคำขอ
  const { sp_code, barcode, status } = req.body;

  // สร้าง BarcodeSubscribe
  BarcodeSubscribe.create({
    sp_code: sp_code,
    barcode: barcode,
    status: status,
  })
      .then(barcodeSubscribe => {
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


// ดึงข้อมูลทั้งหมดของ StockUpdates
exports.findAll = (req, res) => {
  BarcodeSubscribe.findAll()
    .then(stockUpdates => {
      res.send(stockUpdates);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'เกิดข้อผิดพลาดในการดึงข้อมูล StockUpdates'
      });
    });
};

// ดึงข้อมูล BarcodeSubscribe ตาม ID
exports.findOne = (req, res) => {
  const id = req.params.id;

  BarcodeSubscribe.findByPk(id)
    .then(barcodeSubscribe => {
      if (!barcodeSubscribe) {
        res.status(404).send({
          message: `ไม่พบ BarcodeSubscribe ที่มี ID=${id}`
        });
      } else {
        res.send(barcodeSubscribe);
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `เกิดข้อผิดพลาดในการค้นหา BarcodeSubscribe ที่มี ID=${id}`
      });
    });
};

// อัปเดต BarcodeSubscribe ตาม ID
exports.update = (req, res) => {
  const id = req.params.id;

  BarcodeSubscribe.findByPk(id)
    .then(barcodeSubscribe => {
      if (!barcodeSubscribe) {
        res.status(404).send({
          message: `ไม่พบ BarcodeSubscribe ที่มี ID=${id}`
        });
      } else {
        // ดึงข้อมูลใหม่จาก body ของคำขอ
        const { sp_code, barcode, status } = req.body;

        // อัปเดตข้อมูล BarcodeSubscribe
        barcodeSubscribe.sp_code = sp_code;
        barcodeSubscribe.barcode = barcode;
        barcodeSubscribe.status = status;

        barcodeSubscribe.save()
          .then(() => {
            res.send({ message: 'อัปเดต BarcodeSubscribe สำเร็จ' });
          })
          .catch(err => {
            res.status(500).send({
              message: err.message || `เกิดข้อผิดพลาดในการอัปเดต BarcodeSubscribe ที่มี ID=${id}`
            });
          });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `เกิดข้อผิดพลาดในการค้นหา BarcodeSubscribe ที่มี ID=${id}`
      });
    });
};

// ลบ BarcodeSubscribe ตาม ID
exports.delete = (req, res) => {
  const id = req.params.id;

  BarcodeSubscribe.findByPk(id)
    .then(barcodeSubscribe => {
      if (!barcodeSubscribe) {
        res.status(404).send({
          message: `ไม่พบ BarcodeSubscribe ที่มี ID=${id}`
        });
      } else {
        barcodeSubscribe.destroy()
          .then(() => {
            res.send({ message: 'ลบ BarcodeSubscribe สำเร็จ' });
          })
          .catch(err => {
            res.status(500).send({
              message: err.message || `เกิดข้อผิดพลาดในการลบ BarcodeSubscribe ที่มี ID=${id}`
            });
          });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `เกิดข้อผิดพลาดในการค้นหา BarcodeSubscribe ที่มี ID=${id}`
      });
    });
};
