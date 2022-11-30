import UserModel from '../models/UserModel';
import { jwtSign, hashPassword, verifyPassword, verifyToken } from '../helper';

/**
 * A plugin that provide encapsulated routes
 * @param {FastifyInstance} fastify encapsulated fastify instance
 * @param {Object} options plugin options, refer to https://www.fastify.io/docs/latest/Reference/Plugins/#plugin-options
 */
async function auth(fastify, options) {
  const userModel = new UserModel();

  fastify.post('/register', async (req, rep) => {
    const { name, username, email, password, confirm_password } = req.body;

    const usernameData = await userModel.getUser(username);
    const emailData = await userModel.getUser(email);

    if (usernameData && emailData) {
      rep.code(400).send({
        status: rep.statusCode,
        success: false,
        data: null,
        message: 'Username and email already exist'
      });
      return;
    }
    if (usernameData) {
      rep.code(400).send({
        status: rep.statusCode,
        success: false,
        data: null,
        message: 'Username already exist'
      });
      return;
    }
    if (emailData) {
      rep.code(400).send({
        status: rep.statusCode,
        success: false,
        data: null,
        message: 'Email already exist'
      });
      return;
    }

    if (password !== confirm_password) {
      rep.code(400).send({
        status: rep.statusCode,
        success: false,
        data: null,
        message: 'Invalid password'
      });
      return;
    }

    const hashedPassword = await hashPassword(password);

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
        isAdmin: response.isAdmin
      });
      rep.code(200).send({
        status: rep.statusCode,
        success: true,
        data: {
          name,
          username,
          email,
          token
        },
        message: 'Register successful'
      });
    } catch (err: any) {
      rep.code(400).send({
        status: rep.statusCode,
        success: false,
        data: null,
        message: 'Register unsuccessful'
      });
    }
  });

  fastify.post('/login', async (req, rep) => {
    const { user, password } = req.body;

    const userData = await userModel.getUser(user);

    if (userData) {
      const isPassword = verifyPassword(password, userData.password);

      if (isPassword) {
        const token = jwtSign({
          user_id: userData.user_id,
          email: userData.email,
          username: userData.username,
          isAdmin: userData.isAdmin
        });
        rep.code(200).send({
          status: rep.statusCode,
          success: true,
          data: {
            token,
            user: {
              userId: userData.user_id,
              isAdmin: userData.isAdmin
            }
          },
          message: 'Login successful'
        });
      } else {
        rep.code(400).send({
          status: rep.statusCode,
          success: false,
          data: null,
          message: 'Incorrect password'
        });
      }
    } else {
      rep.code(400).send({
        status: rep.statusCode,
        success: false,
        data: null,
        message: 'User not found'
      });
    }
  });

  fastify.post('/validate', (req, rep) => {
    const { token } = req.body;
    const decoded = verifyToken(token);

    rep.send(decoded);
  });
}

module.exports = {
  auth
};
