import UserModel from '../models/UserModel';

async function admin(fastify, options) {
  const userModel = new UserModel();

  fastify.get('/admin', async (req, rep) => {
    try {
      const data = await userModel.getAdminEmail();

      rep.code(200).send({
        status: rep.statusCode,
        success: true,
        data,
        message: 'Success'
      });
    } catch (err: any) {
      rep.code(500).send({
        status: rep.statusCode,
        success: false,
        data: null,
        message: err.message
      });
    }
  });
}

module.exports = admin;
