import UserModel from '../models/UserModel';

/**
 * A plugin that provide encapsulated routes
 * @param {FastifyInstance} fastify encapsulated fastify instance
 * @param {Object} options plugin options, refer to https://www.fastify.io/docs/latest/Reference/Plugins/#plugin-options
 */
async function singer(fastify, options) {
  const userModel = new UserModel();

  fastify.get('/singers', async (req, rep) => {
    const { user_id, name } = await userModel.getSingers();
    rep.code(200).send({
      status: rep.statusCode,
      success: true,
      data: { user_id, name },
      message: 'Success',
    });
  });
}
