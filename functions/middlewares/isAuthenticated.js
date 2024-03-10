const jsonwebtoken = require("jsonwebtoken");
const prismaClient = require("../prisma/index.js");
const { verify } = jsonwebtoken;

async function isAuthenticated(request, response, next) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    request.user_id = "";
    return next();
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

    if (!isValidUser) {
      request.user_id = "";
      return next();
    }

    return next();
  } catch (err) {
    return response.status(401).json({ error: err });
  }
}

module.exports = isAuthenticated;
