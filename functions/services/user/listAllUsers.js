const prismaClient = require("../../prisma/index.js");

async function execute(userId) {
  const user = await prismaClient.user.findFirst({
    where: {
      id: userId,
    },
  });

  if (!user || user.permission !== "admin") {
    throw {
      error: "token.invalid",
      code: 401,
    };
  }

  const users = await prismaClient.user.findMany();

  users.map((item) => {
    delete item.password;
  });

  return users;
}

module.exports.userList = execute;
