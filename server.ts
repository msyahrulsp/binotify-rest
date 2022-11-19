require('dotenv').config()

/**
 * @type {import('fastify').FastifyInstance} Instance of Fastify
 */
const fastify = require('fastify')({
  // logger: true
});

fastify.register(require('./db-connector'))
fastify.register(require('./routes'))
fastify.register(require("@fastify/cors"), {
  origin: "*"
});

// Run the server!
fastify.listen({ port: process.env.APP_PORT }, function (err: Error, address: number) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`Server is now listening on ${address}`);
});
