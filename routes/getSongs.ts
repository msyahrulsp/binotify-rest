import axios from "axios"
import { DOMParser } from 'xmldom'

function getSOAPReturn(xmlString: string) {
  let payload = null
  const xml = new DOMParser().parseFromString(xmlString, 'text/xml')
  const returnElmt = xml.getElementsByTagName('return')
  if (returnElmt[0]) {
    payload = returnElmt[0].firstChild.data
  }
  return payload
}
/**
 * A plugin that provide encapsulated routes
 * @param {FastifyInstance} fastify encapsulated fastify instance
 * @param {Object} options plugin options, refer to https://www.fastify.io/docs/latest/Reference/Plugins/#plugin-options
 */
 async function getSongs(fastify, options) {
  /**
   * fetch list lagu dari seorang penyanyi
   * meminta validasi ke SOAP apakah pengguna binotify sudah subscribe terhadap penyanyi yang diminta
   * @param {int} userid - id pengguna binotify yang melakukan request
   * @param {int} singerid - id penyanyi yang diminta
   * 
   * SOAP return boolean
   *  */  
  fastify.get('/songs/singer/:singerid/user/:userid', async (req, reply) => {
    // const connection = await fastify.mysql.getConnection()
    // const [rows, fields] = await connection.query('SELECT * from song')
    // connection.release()
    // return rows
    const { singerid, userid } = req.params
    let subscriptionStatus: boolean = false

    const reqBody =
    '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:int="http://interfaces.binotify.com/">' + 
      '<soapenv:Header/>' + 
      '<soapenv:Body>' + 
        '<int:getStatus>' + 
            `<creator_id>${singerid}</creator_id>` + 
            `<subscriber_id>${userid}</subscriber_id>` + 
        '</int:getStatus>' + 
      '</soapenv:Body>' + 
    '</soapenv:Envelope>'

    return axios.post(
      'http://localhost:4789/subscription-status?wsdl', 
      reqBody, 
      {
        headers: {'Content-Type': 'text/xml'}
      }
    ).then((res) => {
      if (res.status === 200) {
        const payload = getSOAPReturn(res.data)
        return payload
      }
    }).catch((err) => {
      return false
    })
  })
}

module.exports = getSongs
