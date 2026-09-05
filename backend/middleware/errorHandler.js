function errorHandler(error, req, res, next) {
  if (res.headersSent) {
    return next(error);
  }

  const status = error.status || 500;
  const message =
    status >= 500 ? 'Internal server error' : error.message || 'Request failed';

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
