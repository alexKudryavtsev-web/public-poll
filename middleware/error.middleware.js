import ApiError from "../exceptions/api.error.js";

export default function errorMiddleware(err, req, res, next) {
  if (err instanceof ApiError) {
    return res
      .status(err.status)
      .json({ message: err.message, status: err.status, errors: err.errors });
  }

  console.log(`${new Date().toLocaleTimeString()}: ${err}`);

  return res.status(500).json({ message: "unrecognized error" });
}
