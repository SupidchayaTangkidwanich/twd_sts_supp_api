module.exports = (sequelize, Sequelize, BaseModel) => {
  const BasicModelAttributes = {
    customer_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true }
  };

  const Tutorial = sequelize.define(
    'tbl_tutorial',
    Object.assign(
      {
        Title: {
          type: Sequelize.STRING,
        },
        Description: {
          type: Sequelize.STRING,
        },
        Published: {
          type: Sequelize.BOOLEAN,
        },
        Remark: {
          type: Sequelize.STRING,
        },
      },
      BaseModel
    ),
    {
      timestamps: false,
    }
  );

  return Tutorial;


};
