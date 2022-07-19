const jwt = require("jsonwebtoken");

exports.generateToken = (user) => {
  delete user.password;

  const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1d" });

  return {
    ...{ user },
    ...{ token },
  };
};
