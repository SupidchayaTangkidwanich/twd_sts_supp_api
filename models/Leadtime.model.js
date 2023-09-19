module.exports = (sequelize, Sequelize) => {
    const Leadtime = sequelize.define('Leadtime', {
      sp_code: {
        type: Sequelize.STRING, 
      },
      barcode: {
        type: Sequelize.STRING, 
      },
      leadtime: {
        type: Sequelize.INTEGER,
      },
    });
  
    return Leadtime;
  };
  