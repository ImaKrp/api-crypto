const prismaClient = require("../../prisma/index.js");
const bcrypt = require("bcrypt");

async function execute(body) {
  let user = await prismaClient.user.findFirst({
    where: {
      email: body.email,
    },
  });

  if (user && user.username === body.username) {
    throw {
      error: { key: ["email", "username"], message: "already registered." },
      code: 409,
    };
  }

  user = await prismaClient.user.findFirst({
    where: {
      username: body.username,
    },
  });

  if (user) {
    throw {
      error: { key: ["username"], message: "already registered." },
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

module.exports.userCreate = execute;
