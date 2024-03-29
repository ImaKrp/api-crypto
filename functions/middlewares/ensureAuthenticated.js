const jsonwebtoken = require("jsonwebtoken");
const prismaClient = require("../prisma/index.js");
const { verify } = jsonwebtoken;

async function ensureAuthenticated(request, response, next) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response.status(401).json({
      error: "token.invalid",
    });
  }

  const [, token] = authToken.split(" ");

  try {
    const { sub } = verify(token, process.env.JWT_SECRET);
    request.user_id = sub;

    const isValidUser = await prismaClient.user.findFirst({
      where: {
        id: sub,
      },
    });

    if (!isValidUser)
      return response.status(401).json({
        error: "token.invalid",
      });

    return next();
  } catch (err) {
    return response.status(401).json({ error: err });
  }
}

module.exports = ensureAuthenticated;
