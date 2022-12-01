import axios from 'axios';
import { DOMParser } from 'xmldom';
import { getSOAPHeader } from '../helper';
import UserModel from '../models/UserModel';
import { client } from '../services/redis';

function getSOAPReturn(xmlString: string) {
  let payload: any = [];
  const xml = new DOMParser().parseFromString(xmlString, 'text/xml');
  const returnElmt = xml.getElementsByTagName('return');
  if (returnElmt[0].firstChild) {
    const data = returnElmt[0].firstChild.nodeValue;
    // @ts-ignore
    payload = JSON.parse(data) ?? [];
  }
  return payload;
}

async function subscription(fastify, options) {
  fastify.get('/subscription', async (req, rep) => {
    const userModel = new UserModel();
    let data: any = null;
    const reqBody =
      '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:int="http://interfaces.binotify.com/">' +
      '<soapenv:Header/>' +
      '<soapenv:Body>' +
      '<int:subscriptionList/>' +
      '</soapenv:Body>' +
      '</soapenv:Envelope>';

    return axios
      .post(
        `${process.env.BASE_SOAP_URL}/subscription-list?wsdl`,
        reqBody,
        getSOAPHeader()
      )
      .then((res) => {
        if (res.status === 200) {
          data = getSOAPReturn(res.data);
        }
      })
      .catch((err) => {
        console.info(err);
      })
      .then(async () => {
        if (data) {
          await client.connect();

          let singers = JSON.parse(await client.get('singers')) ?? null;
          if (!singers) {
            singers = await userModel.getSingers();
            await client.set('singers', JSON.stringify(singers));
          }
          await client.disconnect();

          const response = data.map((item) => {
            const singer = singers.find((s) => s.user_id === item.creator_id);
            return {
              ...item,
              creator_name: singer?.name
            };
          });

          rep.code(200).send({
            status: rep.statusCode,
            data: response
          });
        } else {
          return null;
        }
      });
  });

  fastify.put('/subscription', async (req, rep) => {
    const { creator_id, subscriber_id, status } = req.body;
    const reqBody =
      '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:int="http://interfaces.binotify.com/">' +
      '<soapenv:Header/>' +
      '<soapenv:Body>' +
      '<int:updateSubscription>' +
      `<creator_id>${creator_id}</creator_id>` +
      `<subscriber_id>${subscriber_id}</subscriber_id>` +
      `<status>${status}</status>` +
      '</int:updateSubscription>' +
      '</soapenv:Body>' +
      '</soapenv:Envelope>';

    return axios
      .post(
        `${process.env.BASE_SOAP_URL}/subscription-update?wsdl`,
        reqBody,
        getSOAPHeader()
      )
      .then((res) => {
        if (res.status === 200) {
          rep.code(200).send({
            status: rep.statusCode,
            message: 'Berhasil mengubah status subscription'
          });
        }
      });
  });
}

module.exports = subscription;
