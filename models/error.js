class APIError {
  statusCode;
  message;

  constructor(statusCode, message) {
    this.statusCode = statusCode;
    this.message = message;
  }
}

export class BadRequest extends APIError {
  constructor(message) {
    super(400, message);
  }
}
