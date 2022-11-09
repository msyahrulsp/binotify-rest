const fastify = require('fastify')({
  logger: true
});

// Declare a route
fastify.get('/', function (request: Request, reply: any) {
  reply.send({ hello: 'world' });
});

// Run the server!
fastify.listen({ port: 3000 }, function (err: Error, address: number) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`Server is now listening on asdas ${address}`);
});
