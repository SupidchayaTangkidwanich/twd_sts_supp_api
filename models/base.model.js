module.exports = (DataTypes) => {
  const BaseModel = {
    AddedDate: { type: DataTypes.DATE },
    AddedBy: { type: DataTypes.STRING },
    ModifiedDate: { type: DataTypes.DATE },
    ModifiedBy: { type: DataTypes.STRING },
  };

  return BaseModel;
};
