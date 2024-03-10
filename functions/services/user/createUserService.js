import prismaClient from "../../prisma/index.js";
import bcrypt from "bcrypt";

class createUserService {
  async execute(body) {
    let user = await prismaClient.user.findFirst({
      where: {
        email: body.email,
      },
    });

    if (user) {
      throw {
        error: { key: "email", message: "already registered." },
        code: 409,
      };
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);

    if (!user) {
      const data = {
        ...body,
        password: hashedPassword,
      };

      user = await prismaClient.user.create({
        data,
      });
    }

    delete user.password;
    delete user.id;
    return user;
  }
}

export default createUserService;
