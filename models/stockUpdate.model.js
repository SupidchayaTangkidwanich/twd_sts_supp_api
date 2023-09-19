// models/stockUpdate.model.js
module.exports = (sequelize, Sequelize) => {
    const StockUpdate = sequelize.define('stockUpdate', {
      sp_code: {
        type: Sequelize.STRING, // แก้ไขจาก Sequelize.VARCHAR เป็น Sequelize.STRING
      },
      barcode: {
        type: Sequelize.STRING, // แก้ไขจาก Sequelize.VARCHAR เป็น Sequelize.STRING
      },
      qty: {
        type: Sequelize.DECIMAL(10, 2),
      },
    });
    
    return StockUpdate;
  };
  