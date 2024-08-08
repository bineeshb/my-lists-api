const errorHandler = (err, _, res, next) => {
  const status = err.statusCode || 500;
  const errorResponse = {
    status,
    message: err.message || 'Server Error'
  };

  if (process.env.NODE_ENV === 'development' && err.stack) {
    errorResponse = {
      ...errorResponse,
      stack: err.stack
    }
  }

  res.status(status).json(errorResponse)
};

export default errorHandler;
