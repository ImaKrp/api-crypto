import prismaClient from "../../prisma/index.js";
import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcrypt";

const { sign } = jsonwebtoken;

class AuthenticateUserService {
  async execute(body) {
    const { username, password } = body;

    let user = await prismaClient.user.findFirst({
      where: {
        username: username,
      },
    });

    if (!user) {
      throw {
        error: { field: "username", message: "not registered." },
        code: 404,
      };
    }

    const validatePassword = await bcrypt.compare(password, user.password);

    if (!validatePassword) {
      throw {
        error: { field: "password", message: "wrong password." },
        code: 400,
      };
    }

    const token = sign(
      {
        user: {
          email: user.email,
          username: user.username,
          id: user.id,
          permission: user.permission,
        },
      },
      process.env.JWT_SECRET,
      {
        subject: user.id,
      }
    );

    delete user.password;
    delete user.id;
    return { token, user };
  }
}

export default AuthenticateUserService;
