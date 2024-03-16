"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/bycrpt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Asset, { 
        foreignKey: 'userId' 
      });
    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "Email udah terdaftar brow",
        },
        validate: {
          notNull: {
            msg: "Email tidak boleh kosong",
          },
          notEmpty: {
            msg: "Email tidak boleh kosong",
          },
          isEmail: {
            msg: "Harus menggunakan format Email",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Password tidak boleh kosong",
          },
          notEmpty: {
            msg: "Password tidak boleh kosong",
          },
          len: {
            args: [5],
            msg: "Password tidak boleh memiliki dibawah 5 huruf",
          },
        },
      },
      role: {
        type: DataTypes.STRING,
        defaultValue: "plain",
      },
      phoneNumber: DataTypes.STRING,
      address: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  User.beforeCreate((user) => {
    user.password = hashPassword(user.password);
  });
  return User;
};
