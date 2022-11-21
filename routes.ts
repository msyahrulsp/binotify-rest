/**
 * A plugin that provide encapsulated routes
 * @param {FastifyInstance} fastify encapsulated fastify instance
 * @param {Object} options plugin options, refer to https://www.fastify.io/docs/latest/Reference/Plugins/#plugin-options
 */
async function routes(fastify, options) {
  fastify.register(require("./routes/getSongs"));

  fastify.get("/", function (request: Request, reply: any) {
    reply.send({ status: "REST API is healthy :)" });
  });
}

module.exports = routes;
