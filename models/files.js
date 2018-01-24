/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('files', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    time_stamp: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
        primaryKey:true
    }
  }, {
    tableName: 'files',
      timestamps: false,
  });
};
