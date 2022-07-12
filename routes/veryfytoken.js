const jwt = require("jsonwebtoken");

const veryfytoken = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token)
    return res.status(400).json({
      message: "access denied",
    });
  try {
    const verified = jwt.verify(token, process.env.SECRET_KEY);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400),
      json({
        status: res.statusCode,
        message: "Invalid token!",
      });
  }
};

module.exports = veryfytoken;
