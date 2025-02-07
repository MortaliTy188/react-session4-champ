const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const { secretKey, tokenExpiration } = require("../config");

exports.signIn = async (req, res) => {
  const { name, password } = req.body;

  let user = await User.findOne({ where: { name } });

  if (!user) {
    const hashedPassword = bcrypt.hashSync(password, 10);
    user = await User.create({ name, password: hashedPassword });
    return res.status(201).json({
      timestamp: Date.now(),
      message: "Пользователь успешно зарегистрирован",
      user: user,
    });
  }

  if (!bcrypt.compareSync(password, user.password)) {
    return res.status(403).json({
      timestamp: Date.now(),
      message: "Неправильное имя пользователя или пароль",
      errorCode: 2343,
    });
  }

  const token = jwt.sign({ sub: user.name }, secretKey, {
    expiresIn: tokenExpiration,
  });
  res.json({ access_token: token, token_type: "bearer" });
};
