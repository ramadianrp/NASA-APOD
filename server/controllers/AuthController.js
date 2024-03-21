const { User } = require("../models");
const { signToken } = require("../helpers/jwt");
const { comparePassword } = require("../helpers/bycrpt");

class AuthController {
  static async addUser(req, res, next) {
    try {
        // console.log("aaaaaaaa");
      const { username, email, password, role, phoneNumber, address } = req.body;
      await User.create({ username, email, password, role, phoneNumber, address });

      const newUser = {email, role}
      res.status(201).json({ message: "user created", newUser });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      console.log(req.body, "<<<<<");
      const { email, password } = req.body;
      if (!email) {
        throw {
          name: "EmailIsEmpty",
        };
      }
      if (!password) {
        throw {
          name: "PasswordIsEmpty",
        };
      }

      const user = await User.findOne({
        where: { email },
      });
      console.log(user, "<<< user masuk");
      if (!user) {
        throw {
          name: "InvalidLogin",
        };
      }

      const userPassword = comparePassword(password, user.password);
      if (!userPassword) {
        throw {
          name: "InvalidLogin",
        };
      }
      console.log(userPassword, "<<<< userPass");

      const payload = {
        id: user.id,
      };

      const token = signToken(payload);

      res.status(200).json({ message: "Success Login", token });

    } catch (error) {
      console.log(error, 'error di catch');
      next(error);
    }
  }
}

module.exports = AuthController;
