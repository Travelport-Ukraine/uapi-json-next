export const SOAP_HEAD = '<SOAP:Envelope xmlns:SOAP="http://schemas.xmlsoap.org/soap/envelope/"><SOAP:Body>';
export const SOAP_FOOTER = '</SOAP:Body></SOAP:Envelope>';

/**
 * This module is required cause jsonix only parses things inside soap header/footer
 * So we basically need to strip it or wrap when we receive response or send request.
 */

export function wrapIntoSoap(xml) {
    return [SOAP_HEAD, xml, SOAP_FOOTER].join('');
}

export function stripSoap(xml) {
    return xml
        .replace(SOAP_HEAD, '')
        .replace(SOAP_FOOTER, '');
}