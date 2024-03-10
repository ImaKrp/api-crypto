import { verify } from "jsonwebtoken";

export function ensureAuthenticated(request, response, next) {
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

    return next();
  } catch (err) {
    return response.status(401).json({ error: err });
  }
}
