const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

export const jwtSign = (data) => {
  const EXPIRED_TIME = 1 * 60 * 60;
  return jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + EXPIRED_TIME,
      data: {
        user_id: data.user_id,
        name: data.name,
        isAdmin: data.isAdmin,
      },
    },
    process.env.JWT_SECRET_KEY
  );
};

export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const verifyPassword = (password, userPassword) => {
  return bcrypt.compareSync(password, userPassword);
};

export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET_KEY);
};

/**
 * return http headers to use SOAP service
 */
export const getSOAPHeader = () => {
  return {
    headers: {
      Authorization: `Basic ${process.env.SOAP_API_KEY}`,
      "Content-Type": "text/xml",
      "X-Forwarded-For": `${process.env.APP_ADDRESS}`,
      Date: new Date().toISOString().replace(/T/, " ").replace(/\..+/, ""),
    },
  };
};
