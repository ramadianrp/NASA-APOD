const { Asset } = require("../models");

const authorAdmin = async (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      throw {
        name: "Forbidden",
      };
    }
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const authorPlain = async (req, res, next) => {
  try {
    if (req.user.role === "admin") {
      next();
    }

    if (req.user.role === "plain") {
      const { id } = req.params;
      const plain = await Asset.findByPk(id);

      if (!plain) {
        throw {
          name: "NotFound",
        };
      }

      if (req.user.id === plain.authorId) {
        next();
      } else {
        throw {
          name: "Forbidden",
        };
      }
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  authorAdmin,
  authorPlain
};
