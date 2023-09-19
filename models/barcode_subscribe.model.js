module.exports = (sequelize, Sequelize) => {
    const BarcodeSubscribe = sequelize.define("barcode_subscribe", {
      sp_code: {
        type: Sequelize.STRING,
      },
      barcode: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.STRING(1),
      },
    });
  
    return BarcodeSubscribe;
  };
  