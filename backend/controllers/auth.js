const User = require("../models").User;
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/token");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(400).json({ message: "User not found." });
    }

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
      return res.status(400).json({ message: "Invalid user credentials." });
    }

    const userWithToken = generateToken(user.get({ raw: true }));
    userWithToken.user.avatar = user.avatar;

    return res.status(200).json(userWithToken);
  } catch (error) {
    console.error(`login - ${error}`);
    return res.status(500).json({ message: error.message });
  }
};

exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, gender } = req.body;

    const exist = await User.findOne({
      where: {
        email,
      },
    });

    if (exist) {
      return res.status(400).json({ message: "User already exist." });
    }

    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      gender,
      avatar: user.avatar,
    });

    const userWithToken = generateToken(user.get({ raw: true }));

    return res.status(201).json(userWithToken);
  } catch (error) {
    console.error(`register - ${error}`);
    return res.status(500).json({ message: error.message });
  }
};
