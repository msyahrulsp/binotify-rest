import UserModel from '../models/UserModel';
import { jwtSign, hashPassword, verifyPassword, verifyToken } from '../helper';
import { client } from '../services/redis';

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
        name: response.name,
        isAdmin: response.isAdmin
      });
      const storeSinger = {
        user_id: response.user_id,
        name: response.name
      };
      await client.connect();
      const cachedSingers = (await client.get('singers')) ?? null;
      if (cachedSingers) {
        await client.set(
          'singers',
          cachedSingers.replace(']', `,${JSON.stringify(storeSinger)}]`)
        );
      } else {
        await client.set('singers', JSON.stringify(storeSinger));
      }
      await client.disconnect();

      rep.code(200).send({
        status: rep.statusCode,
        success: true,
        data: {
          token,
          user: {
            userId: response.user_id,
            name: response.name,
            isAdmin: response.isAdmin
          }
        },
        message: 'Register successful'
      });
    } catch (err: any) {
      rep.code(500).send({
        status: rep.statusCode,
        success: false,
        data: null,
        message: 'Register unsuccessful'
      });
    }
  });

  fastify.post('/login', async (req, rep) => {
    const { user, password } = req.body;

    try {
      const userData = await userModel.getUser(user);

      if (userData) {
        const isPassword = verifyPassword(password, userData.password);

        if (isPassword) {
          const token = jwtSign({
            user_id: userData.user_id,
            name: userData.name,
            isAdmin: userData.isAdmin
          });
          rep.code(200).send({
            status: rep.statusCode,
            success: true,
            data: {
              token,
              user: {
                name: userData.name,
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
    } catch (err: any) {
      rep.code(500).send({
        status: rep.statusCode,
        success: false,
        data: null,
        message: err.message
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
