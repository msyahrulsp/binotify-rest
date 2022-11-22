/**
 * @type {import('fastify-plugin').FastifyPlugin}
 */
const fastifyPlugin = require('fastify-plugin');

async function dbConnector(fastify, options) {
  fastify.register(require('@fastify/mysql'), {
    promise: true,
    connectionString: `mysql://${process.env.DB_USERNAME}${
      process.env.DB_PASSWORD ? ':' + process.env.DB_PASSWORD : ''
    }@${process.env.DB_HOST}/${process.env.DB_NAME}`
  });
}

module.exports = fastifyPlugin(dbConnector);
