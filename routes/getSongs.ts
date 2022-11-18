/**
 * A plugin that provide encapsulated routes
 * @param {FastifyInstance} fastify encapsulated fastify instance
 * @param {Object} options plugin options, refer to https://www.fastify.io/docs/latest/Reference/Plugins/#plugin-options
 */
 async function getSongs(fastify, options) {  
  fastify.get('/songs', async (req, reply) => {
    const connection = await fastify.mysql.getConnection()
    const [rows, fields] = await connection.query('SELECT * from song')
    connection.release()
    return rows
  })
}

module.exports = getSongs
