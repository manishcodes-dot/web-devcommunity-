class ApiResponse {
  constructor(statusCode, data = null, message = 'Operation successful') {
    this.statusCode = statusCode;
    this.success = statusCode < 400;
    this.message = message;
    if (data !== null) {
      this.data = data;
    }
  }

  send(res) {
    const payload = {
      success: this.success,
      message: this.message,
    };
    if (this.data !== undefined) {
      payload.data = this.data;
    }
    return res.status(this.statusCode).json(payload);
  }
}

export default ApiResponse;
