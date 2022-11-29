import axios from 'axios';
import { DOMParser } from 'xmldom';
import SongModel from '../models/SongModel';

function getSOAPReturn(xmlString: string) {
  let payload: string = '';
  const xml = new DOMParser().parseFromString(xmlString, 'text/xml');
  const returnElmt = xml.getElementsByTagName('return');
  if (returnElmt[0].firstChild) {
    // @ts-expect-error
    payload = returnElmt[0].firstChild.data;
  }
  return payload === 'true';
}

/**
 * A plugin that provide encapsulated routes
 * @param {FastifyInstance} fastify encapsulated fastify instance
 * @param {Object} options plugin options, refer to https://www.fastify.io/docs/latest/Reference/Plugins/#plugin-options
 */
async function getSongs(fastify, options) {
  const songModel = new SongModel();

  // contoh prisma
  fastify.get('/songs', async (req, reply) => {
    return songModel.getSongs();
  });

  fastify.get('/singer/:singerid/songs', async (req, reply) => {
    const { singerid } = req.params;
    const connection = await fastify.mysql.getConnection();
    const [rows, fields] = await connection.query(
      `SELECT song_id, judul, penyanyi_id, audio_path, name FROM song inner join user on song.penyanyi_id = user.user_id where song.penyanyi_id=${singerid}`
    );
    connection.release();
    return rows;
  });

  fastify.get('/singer/:singerid/songs/:songid', async (req, reply) => {
    // get single song based on singerid
    const { singerid, songid } = req.params;
    const connection = await fastify.mysql.getConnection();
    const [rows, fields] = await connection.query(
      `SELECT song_id, judul, penyanyi_id, audio_path, name FROM song inner join user on song.penyanyi_id = user.user_id where song.penyanyi_id=${singerid} and song.song_id=${songid}`
    );
    connection.release();
    return rows;
  });

  fastify.get('/status/singer/:singerid/user/:userid', async (req, reply) => {
    /**
     * digunakan untuk pendengar
     * fetch list lagu dari seorang penyanyi
     * meminta validasi ke SOAP apakah pengguna binotify sudah subscribe terhadap penyanyi yang diminta
     * @param {int} userid - id pengguna binotify yang melakukan request
     * @param {int} singerid - id penyanyi yang diminta
     *
     * SOAP return string
     *  */
    const { singerid, userid } = req.params;
    let subscriptionStatus: boolean = false;

    const reqBody =
      '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:int="http://interfaces.binotify.com/">' +
      '<soapenv:Header/>' +
      '<soapenv:Body>' +
      '<int:getStatus>' +
      `<creator_id>${singerid}</creator_id>` +
      `<subscriber_id>${userid}</subscriber_id>` +
      '</int:getStatus>' +
      '</soapenv:Body>' +
      '</soapenv:Envelope>';

    return axios
      .post('http://0.0.0.0:3003/subscription-status?wsdl', reqBody, {
        headers: { 'Content-Type': 'text/xml' }
      })
      .then((res) => {
        if (res.status === 200) {
          subscriptionStatus = getSOAPReturn(res.data);
        }
      })
      .catch((err) => {
        console.info(err);
      })
      .then(async () => {
        if (subscriptionStatus) {
          const connection = await fastify.mysql.getConnection();
          const [rows, fields] = await connection.query(
            `SELECT * from song where penyanyi_id=${singerid}`
          );
          connection.release();
          return rows;
        } else {
          return null;
        }
      });
  });
}

module.exports = getSongs;
