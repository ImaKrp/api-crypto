const bcrypt = require("bcrypt");
const handleFields = require("../utils/handleFields.js");
const { userCreate } = require("../services/user/createUserService.js");
const {
  userAuthenticate,
} = require("../services/user/authenticateUserService.js");

class userController {
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
}

module.exports = userController;

// export default class userController {
//   constructor() {}

//   async update(req, res) {
//     const { user_id } = req;
//     const { email, password, name, adress, phone, last_name } = req.body;

//     if (!email && !password && !name && !last_name && !adress && !phone) {
//       return res.status(400).json({
//         error: {
//           message: `Some field is required: email, password, name, adress, phone, last_name`,
//         },
//       });
//     }

//     const service = new UpdateUserService();
//     try {
//       const result = await service.execute(
//         user_id,
//         email,
//         password,
//         name,
//         adress,
//         phone,
//         last_name
//       );
//       return res.json(result);
//     } catch (err) {
//       return res
//         .status(err.code ?? 400)
//         .json({ error: err.error ?? err.message });
//     }
//   }
//   async listAll(req, res) {
//     const { is_admin: isAdmin } = req;
//     const service = new GetAllUsersService();

//     if (isAdmin) {
//       try {
//         const result = await service.execute();
//         return res.json(result);
//       } catch (err) {
//         return res
//           .status(err.code ?? 400)
//           .json({ error: err.error ?? err.message });
//       }
//     } else
//       return res.status(401).json({ error: "Only admins can create sizes." });
//   }
// }
