const models = require("../models");
const User = models.User;
const Chat = models.Chat;
const ChatUser = models.ChatUser;
const Message = models.Message;
const { Op } = require("sequelize");
const { sequelize } = require("../models");

exports.index = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.user.id,
      },
      include: [
        {
          model: Chat,
          include: [
            {
              model: User,
              where: {
                [Op.not]: {
                  id: req.user.id,
                },
              },
            },
            {
              model: Message,
              include: [
                {
                  model: User,
                },
              ],
              limit: 20,
              order: [["id", "DESC"]],
            },
          ],
        },
      ],
    });

    return res.status(200).json(user.Chats);
  } catch (error) {
    console.error(`[controller] chat index - ${error}`);
    return res.status(500).json({ message: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { partnerId } = req.body;
    const t = await sequelize.transaction();

    const user = await User.findOne({
      where: {
        id: req.user.id,
      },
      include: [
        {
          model: Chat,
          where: {
            type: "dual",
          },
          include: [
            {
              model: ChatUser,
              where: {
                userId: partnerId,
              },
            },
          ],
        },
      ],
    });

    if (user && user.Chats.length > 0) {
      return res
        .status(403)
        .json({ message: "Chat with this user already exists." });
    }

    const chat = await Chat.create(
      {
        type: "dual",
      },
      { transaction: t }
    );

    await ChatUser.bulkCreate(
      [
        {
          chatId: chat.id,
          userId: req.user.id,
        },
        {
          chatId: chat.id,
          userId: partnerId,
        },
      ],
      { transaction: t }
    );

    await t.commit();

    const newChat = await Chat.findOne({
      where: {
        id: chat.id,
      },
      include: [
        {
          model: User,
          where: {
            [Op.not]: {
              id: req.user.id,
            },
          },
        },
        {
          model: Message,
        },
      ],
    });

    return res.status(200).json(newChat);
  } catch (error) {
    await t.rollback();
    console.error(`[controller] chat create - ${error}`);
    return res.status(500).json({ message: error.message });
  }
};

exports.messages = async (req, res) => {
  try {
    const limit = 10;
    const page = req.query.page || 1;
    const offset = page > 1 ? page * limit : 0;

    const messages = await Message.findAndCountAll({
      where: {
        chatId: req.query.id,
      },
      include: [
        {
          model: User,
        },
      ],
      limit,
      offset,
    });

    const totalPages = Math.ceil(messages.count / limit);

    if (page > totalPages) {
      return res.status(200).json({ data: { messages: [] } });
    }

    const result = {
      messages: messages.rows,
      pagination: {
        page,
        totalPages,
      },
    };

    return res.status(200).json(result);
  } catch (error) {
    console.error(`[controller] chat messages - ${error}`);
    return res.status(500).json({ message: error.message });
  }
};

exports.deleteChat = async (req, res) => {
  try {
    await Chat.destroy({
      where: {
        id: req.params.id,
      },
    });

    return res.status(200).json({ message: "Chat deleted successfully." });
  } catch (error) {
    console.error(`[controller] chat deleteChat - ${error}`);
    return res.status(500).json({ message: error.message });
  }
};
