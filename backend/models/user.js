"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcryptjs");
const { config } = require("dotenv");

config();

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Chat, {
        through: "ChatUser",
        foreignKey: "userId",
      });
      this.hasMany(models.ChatUser, { foreignKey: "userId" });
    }
  }
  User.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      gender: DataTypes.STRING,
      avatar: {
        type: DataTypes.STRING,
        get() {
          const avatar = this.getDataValue("avatar");
          const url = "http://localhost:5000";

          if (!avatar) {
            return `${url}/${this.getDataValue("gender")}.svg`;
          }

          const id = this.getDataValue("id");
          return `${url}/user/${id}/${avatar}`;
        },
      },
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        beforeCreate: hashedPassword,
        beforeUpdate: hashedPassword,
      },
    }
  );
  return User;
};

const hashedPassword = async (user) => {
  if (user.changed("password")) {
    const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS));
    const hashedPassword = await bcrypt.hash(user.password, salt);

    user.password = hashedPassword;
  }

  return user;
};
