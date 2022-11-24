import UserModel from "../models/UserModel";
import {
  replyData,
  jwtSign,
  hashPassword,
  verifyPassword,
  verifyToken,
} from "../helper";

/**
 * A plugin that provide encapsulated routes
 * @param {FastifyInstance} fastify encapsulated fastify instance
 * @param {Object} options plugin options, refer to https://www.fastify.io/docs/latest/Reference/Plugins/#plugin-options
 */
async function auth(fastify, options) {
  const userModel = new UserModel();

  fastify.post("/register", async (req, rep) => {
    const { name, username, email, password, confirm_password } = req.body;

    const usernameData = await userModel.getUser(username);
    const emailData = await userModel.getUser(email);

    if (usernameData && emailData) {
      rep
        .code(400)
        .send(
          replyData(
            rep.statusCode,
            false,
            null,
            "Username and Email already exist"
          )
        );
    }
    if (usernameData) {
      rep
        .code(400)
        .send(replyData(rep.statusCode, false, null, "Username already exist"));
    }
    if (emailData) {
      rep
        .code(400)
        .send(replyData(rep.statusCode, false, null, "Email already exist"));
    }

    if (password !== confirm_password) {
      rep
        .code(400)
        .send(
          replyData(
            rep.statusCode,
            false,
            null,
            "Password and Confirm Password are different!"
          )
        );
    }

    const hashedPassword = hashPassword(password);

    try {
      const response = await userModel.registerUser(
        email,
        hashedPassword,
        name,
        username
      );
      const token = jwtSign({
        user_id: response.user_id,
        email: response.email,
        username: response.username,
        isAdmin: response.isAdmin,
      });
      rep
        .code(200)
        .send(
          replyData(
            rep.statusCode,
            true,
            { name, username, email, token },
            "Register Successful"
          )
        );
    } catch (err: any) {
      rep
        .code(400)
        .send(replyData(rep.statusCode, false, null, "Register Unsuccessful"));
    }
  });

  fastify.post("/login", async (req, rep) => {
    const { user, password } = req.body;

    const userData = await userModel.getUser(user);

    if (userData) {
      const isPassword = verifyPassword(password, userData.password);

      if (isPassword) {
        const token = jwtSign({
          user_id: userData.user_id,
          email: userData.email,
          username: userData.username,
          isAdmin: userData.isAdmin,
        });
        rep.code(200).send(
          replyData(
            rep.statusCode,
            true,
            {
              token,
            },
            "Login Successful"
          )
        );
      } else {
        rep
          .code(400)
          .send(replyData(rep.statusCode, false, null, "Incorrect password"));
      }
    } else {
      rep
        .code(400)
        .send(replyData(rep.statusCode, false, null, "User not found"));
    }
  });

  fastify.post("/validate", (req, rep) => {
    const { token } = req.body;
    const decoded = verifyToken(token);

    rep.send(decoded);
  });
}

module.exports = {
  auth,
};
