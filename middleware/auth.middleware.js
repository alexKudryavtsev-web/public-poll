import ApiError from "../exceptions/api.error.js";
import TokenService from "../services/token.service.js";

export default async function authMiddleware(req, res, next) {
  try {
    if (!req.headers.authorization) {
      throw ApiError.UnathorizedError();
    }

    const accessToken = req.headers.authorization.split(" ")[1];
    const dataFromToken = await TokenService.verifyAccessToken(accessToken);

    if (!accessToken || !dataFromToken) {
      throw ApiError.UnathorizedError();
    }

    req.user = {
      userId: dataFromToken.id,
      email: dataFromToken.email,
      firstname: dataFromToken.firstname,
      lastname: dataFromToken.lastname,
    };

    next();
  } catch (e) {
    next(e);
  }
}
