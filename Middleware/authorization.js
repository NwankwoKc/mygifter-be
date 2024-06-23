const jwt = require('jsonwebtoken');

exports.authorize = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: 'Authorization header not provided',
      });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Token not provided',
      });
    }

    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.status(401).json({
          success: false,
          message: 'Token verification failed',
          error: err,
        });
      }

      if (user.code !== 'role') {
        return res.status(401).json({
          success: false,
          message: 'User is not an admin',
        });
      }

      req.user = user;
      next();
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed authorizing request header',
      error: error.message,
    });
  }
};
