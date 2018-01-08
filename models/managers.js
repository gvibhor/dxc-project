/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('managers', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true
    },
    phone_no: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'managers',
      timestamps: false,

  });
};
