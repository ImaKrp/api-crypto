const jsonwebtoken = require("jsonwebtoken");
const { verify } = jsonwebtoken;
function getUserPermission(request, response, next) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    request.is_admin = false;
    return next();
  }

  const [, token] = authToken.split(" ");

  try {
    const { user } = verify(token, process.env.JWT_SECRET);
    request.is_admin = user.permission === "admin";
    return next();
  } catch (err) {
    return response.status(401).json({ error: err });
  }
}

module.exports = getUserPermission;
