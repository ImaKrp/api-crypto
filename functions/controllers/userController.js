const bcrypt = require("bcrypt");
const { handleFields } = require("../utils/handleFields.js");
const { userCreate } = require("../services/user/createUserService.js");
const {
  usernameAvaliable,
} = require("../services/user/verifyUsernameAvaliability.js");
const { userUpdate } = require("../services/user/updateUserService.js");
const { userList } = require("../services/user/listAllUsers.js");
const {
  userAuthenticate,
} = require("../services/user/authenticateUserService.js");

class userController {
  async username(req, res) {
    const { user_id } = req;
    const expectedFields = ["username"];
    const { body } = req;

    const errors = [];

    expectedFields.forEach((field) => {
      if (!body[field]) errors.push(field);
    });

    if (errors.length > 0) {
      return res.status(400).json({
        error: {
          message: handleFields(errors),
        },
      });
    }

    try {
      const result = await usernameAvaliable(user_id, body);
      return res.json(result);
    } catch (err) {
      return res
        .status(err.code ?? 400)
        .json({ error: err.error ?? err.message });
    }
  }
  async create(req, res) {
    const expectedFields = ["email", "password", "username"];
    const { body } = req;

    const errors = [];

    expectedFields.forEach((field) => {
      if (!body[field]) errors.push(field);
    });

    if (errors.length > 0) {
      return res.status(400).json({
        error: {
          message: handleFields(errors),
        },
      });
    }

    try {
      const result = await userCreate(body);
      return res.json(result);
    } catch (err) {
      return res
        .status(err.code ?? 400)
        .json({ error: err.error ?? err.message });
    }
  }
  async authenticate(req, res) {
    const expectedFields = ["username", "password"];
    const { body } = req;

    const errors = [];

    expectedFields.forEach((field) => {
      if (!body[field]) errors.push(field);
    });

    if (errors.length > 0) {
      return res.status(400).json({
        error: {
          message: handleFields(errors),
        },
      });
    }

    try {
      const result = await userAuthenticate(body);
      return res.json(result);
    } catch (err) {
      return res
        .status(err.code ?? 400)
        .json({ error: err.error ?? err.message });
    }
  }
  async listAll(req, res) {
    const { is_admin } = req;
    if (is_admin) {
      try {
        const result = await userList();
        return res.json(result);
      } catch (err) {
        return res
          .status(err.code ?? 400)
          .json({ error: err.error ?? err.message });
      }
    } else
      return res.status(401).json({ error: "Only admins can list users." });
  }
  async update(req, res) {
    const { user_id } = req;
    const expectedFields = ["email", "password", "username"];
    const { body } = req;

    const errors = [];

    expectedFields.forEach((field) => {
      if (!body[field]) errors.push(field);
    });

    if (errors.length === 3) {
      return res.status(400).json({
        error: {
          message: handleFields(errors, true),
        },
      });
    }

    try {
      const result = await userUpdate(user_id, body);
      return res.json(result);
    } catch (err) {
      return res
        .status(err.code ?? 400)
        .json({ error: err.error ?? err.message });
    }
  }
}

module.exports = userController;
