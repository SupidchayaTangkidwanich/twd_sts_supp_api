// models/stsTable.model.js
module.exports = (sequelize, Sequelize) => {
    const StsTable = sequelize.define('sts_table', {
      sp_code: {
        type: Sequelize.STRING,
      },
      barcode: {
        type: Sequelize.STRING,
      },
      leadtime: {
        type: Sequelize.INTEGER,
      },
      status: {
        type: Sequelize.STRING(1),
      },
      qty: {
        type: Sequelize.DECIMAL(10, 2),
      },
    });

  
    return StsTable;
  };
  