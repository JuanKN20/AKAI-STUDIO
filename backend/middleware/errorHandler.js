function errorHandler(error, req, res, next) {
  if (res.headersSent) {
    return next(error);
  }

  const status = error.status || 500;
  const message = error.message || 'Internal server error';

  if (status >= 500) {
    console.error('[error]', error);
  }

  return res.status(status).json({
    ok: false,
    error: message,
  });
}

function notFoundHandler(req, res) {
  return res.status(404).json({
    ok: false,
    error: 'Route not found',
  });
}

module.exports = {
  errorHandler,
  notFoundHandler,
};