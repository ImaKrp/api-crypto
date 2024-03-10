// import { AuthenticateUserService } from "../services/User/AuthenticateUserService";
import createUserService from "../services/user/createUserService.js";
import authenticateUserService from "../services/user/authenticateUserService.js";
// import { UpdateUserService } from "../services/User/UpdateUserService";
// import { GetAllUsersService } from "../services/User/GetAllUsersService";

import handleFields from "../utils/handleFields.js";

class userController {
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

    const service = new authenticateUserService();
    try {
      const result = await service.execute(body);
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

    const service = new createUserService();

    try {
      const result = await service.execute(body);
      return res.json(result);
    } catch (err) {
      return res
        .status(err.code ?? 400)
        .json({ error: err.error ?? err.message });
    }
  }
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
}

export default userController;
