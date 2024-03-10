const prismaClient = require("../../prisma/index.js");
const bcrypt = require("bcrypt");

async function execute(userId, body) {
  const expectedFields = ["email", "password", "username"];
  const data = {};

  for (let i = 0; i < expectedFields.length; i++) {
    const field = expectedFields[i];
    if (body?.[field]) {
      let value = body?.[field];
      if (field === "password") value = await bcrypt.hash(value, 10);

      data[field] = value;
    }
  }

  if (body.email) {
    const user = await prismaClient.user.findFirst({
      where: {
        email: body.email,
      },
    });
    if (user && user.id !== userId) {
      throw {
        error: { key: ["email"], message: "already registered." },
        code: 409,
      };
    }
  }

  if (body.username) {
    const user = await prismaClient.user.findFirst({
      where: {
        username: username,
      },
    });
    if (user && user.id !== userId) {
      throw {
        error: { key: ["username"], message: "already registered." },
        code: 409,
      };
    }
  }

  const user = await prismaClient.user.update({
    where: {
      id: userId,
    },
    data: {
      ...data,
    },
  });

  delete user.password;
  delete user.id;
  return user;
}

module.exports.userUpdate = execute;
