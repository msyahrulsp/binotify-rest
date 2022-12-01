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
    try {
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

module.exports = singer;
