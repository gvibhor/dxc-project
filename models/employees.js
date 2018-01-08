/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('employees', {
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
      allowNull: false
    },
    phone_no: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    manager_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'managers',
        key: 'id'
      }
    },
    read_access: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    write_access: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    tableName: 'employees',
      timestamps: false,
  });
};
