function adminAuth(req, res, next) {
  const expectedToken = process.env.ADMIN_API_TOKEN;
  const incomingToken = req.header('x-admin-token');

  if (!expectedToken) {
    return res.status(401).json({
      ok: false,
      error: 'Admin API token is not configured',
    });
  }

  if (!incomingToken || incomingToken !== expectedToken) {
    return res.status(401).json({
      ok: false,
      error: 'Unauthorized',
    });
  }

  return next();
}

module.exports = adminAuth;