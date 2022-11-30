require('dotenv').config();

/**
 * @type {import('fastify').FastifyInstance} Instance of Fastify
 */
const fastify = require('fastify')({
  logger: true
});

fastify.register(require('./db-connector'));
fastify.register(require('./routes'));
fastify.register(require('@fastify/cors'), {
  origin: '*'
});

const start = async () => {
  try {
    await fastify.listen({
      port: process.env.APP_PORT,
      host: process.env.APP_HOST
    });
    fastify.log.info(`server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
