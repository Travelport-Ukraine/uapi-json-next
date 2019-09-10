import { Air } from 'uapi-json-types';
import r from 'axios';
import { airNamespaceUri, marshaller, stripSoap, unmarshaller, wrapIntoSoap } from './parser';

/**
 * Request logic is pretty straightforward - get params, generate xml, parse response, return.
 */
export async function request(params: Air.Definitions.LowFareSearchReq): Promise<Air.Definitions.LowFareSearchRsp> {
    const requestXml =marshaller.marshalString({
        name:  {
            namespaceURI: airNamespaceUri,
            localPart: 'LowFareSearchReq',
            prefix: 'air',
        },
        value: params
    });

    const res = await r.request({
        url: 'https://emea.universal-api.travelport.com/B2BGateway/connect/uAPI/AirService',
        timeout: 30000,
        headers: {
            'Accept-Encoding': 'gzip',
            'Content-Type': 'text/xml',
        },
        method: 'post',
        auth: {
            username: process.env.USERNAME,
            password: process.env.PASSWORD,
        },
        data: wrapIntoSoap(requestXml)
    });

    const responseXml = stripSoap(res.data);
    const response: Air.Definitions.LowFareSearchRsp = unmarshaller.unmarshalString(responseXml).value;

    return response;
}