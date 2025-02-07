const jwt = require("jsonwebtoken");
const { secretKey } = require("../config");

const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token.split(" ")[1], secretKey, (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Неправильный токен" });
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401).json({ message: "Отсутствует токен" });
  }
};

module.exports = authenticateJWT;
