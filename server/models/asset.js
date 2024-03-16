'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Asset extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Asset.belongsTo(models.User, {
        foreignKey: 'userId'
      })
    }
  }
  Asset.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "asset name tidak boleh kosong",
        },
        notEmpty: {
          msg: "asset name tidak boleh kosong",
        }
      }
    },
    desc: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "asset desc name tidak boleh kosong",
        },
        notEmpty: {
          msg: "asset desc name tidak boleh kosong",
        }
      }
    },
    dateFound: {
      type: DataTypes.STRING,
      defaultValue: "unknown"
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "userId tidak boleh kosong",
        },
        notEmpty: {
          msg: "userId tidak boleh kosong",
        },
      }
    }
  }, {
    sequelize,
    modelName: 'Asset',
  });
  return Asset;
};