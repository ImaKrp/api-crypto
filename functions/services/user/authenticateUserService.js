const bcrypt = require("bcrypt");
const prismaClient = require("../../prisma/index.js");
const jsonwebtoken = require("jsonwebtoken");

const { sign } = jsonwebtoken;

async function execute(body) {
  const { username, password } = body;

  let user = await prismaClient.user.findFirst({
    where: {
      username: username,
    },
  });

  if (!user) {
    throw {
      error: { key: ["username"], message: "not registered." },
      code: 404,
    };
  }

  const validatePassword = await bcrypt.compare(password, user.password);

  if (!validatePassword) {
    throw {
      error: { key: ["password"], message: "wrong password." },
      code: 401,
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
module.exports.userAuthenticate = execute;
