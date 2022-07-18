const User = require("../models").User;
const sequelize = require("sequelize");

exports.update = async (req, res) => {
  try {
    if (req.file) {
      req.body.avatar = req.file.filename;
    }

    if (
      typeof req.body.avatar === "undefined" ||
      req.body.avatar.length === 0
    ) {
      delete req.body.avatar;
    }

    if (
      typeof req.body.password === "undefined" ||
      req.body.password.length === 0
    ) {
      delete req.body.password;
    }

    console.log("update body: ", req.body);

    const [rows, result] = await User.update(req.body, {
      where: {
        id: req.user.id,
      },
      returning: true,
      individualHooks: true,
    });

    const user = result[0].get({ raw: true });
    user.avatar = result[0].avatar;

    delete user.password;

    return res.status(200).json(user);
  } catch (error) {
    console.error(`[controller] update - ${error}`);
    return res.status(500).json({ message: error.message });
  }
};
