import UserModel from '../models/UserModel';
import { client } from '../services/redis';

/**
 * A plugin that provide encapsulated routes
 * @param {FastifyInstance} fastify encapsulated fastify instance
 * @param {Object} options plugin options, refer to https://www.fastify.io/docs/latest/Reference/Plugins/#plugin-options
 */
async function singer(fastify, options) {
  const userModel = new UserModel();

  fastify.get('/singers', async (req, rep) => {
    await client.connect();

    let data = JSON.parse(await client.get('singers')) ?? null;
    if (!data) {
      data = await userModel.getSingers();
      await client.set('singers', JSON.stringify(data));
    }
    await client.disconnect();

    rep.code(200).send({
      status: rep.statusCode,
      success: true,
      data,
      message: 'Success'
    });
  });
}

module.exports = singer;
