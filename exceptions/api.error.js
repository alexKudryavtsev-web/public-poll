class ApiError extends Error {
  status;
  errors;

  constructor(message, status, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static BadRequest(message) {
    return new ApiError(message, 400);
  }

  static UnathorizedError() {
    return new ApiError("unathorized error", 401);
  }
}

export default ApiError;
