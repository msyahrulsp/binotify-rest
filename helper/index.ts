const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

export const replyData = (statusCode, success, data, message) => {
  return {
    status: statusCode,
    success: success,
    data: data,
    message: message,
  };
};

export const jwtSign = (data) => {
  return jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60,
      data: {
        user_id: data.user_id,
        email: data.email,
        username: data.username,
        isAdmin: data.isAdmin,
      },
    },
    process.env.JWT_SECRET_KEY
  );
};

export const hashPassword = (password) => {
  const saltRounds = 10;
  return bcrypt.hashSync(password, saltRounds);
};

export const verifyPassword = (password, userPassword) => {
  return bcrypt.hashSync(password, userPassword);
};

export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET_KEY);
};
