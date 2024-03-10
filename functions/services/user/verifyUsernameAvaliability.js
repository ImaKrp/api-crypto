const prismaClient = require("../../prisma/index.js");

async function execute(userId, body) {
  const user = await prismaClient.user.findFirst({
    where: {
      username: body.username,
    },
  });

  if ((!userId && user) || (userId && user.id !== userId)) {
    throw {
      error: { key: ["username"], message: "already registered." },
      code: 409,
    };
  }

  return {
    message: "avaliable",
  };
}

module.exports.usernameAvaliable = execute;
