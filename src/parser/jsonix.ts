/**
 * Jsonix module by itself is a bit wierd (just check sources :) ), so we need
 * to require instead of importing modules
 */
const { Jsonix } = require('jsonix');
const schemas: any = require('uapi-json-types/jsonix-schema');

/**
 * Namespace is required to generate correct request. It also contains a version.
 * The good point we can reuse it from types lib.
 */
export const airNamespaceUri: string = decodeURIComponent(schemas.air.defaultElementNamespaceURI);

/**
 * This function loads all pre-compiled definitions for all services to be used in
 * parser(unmarshaller, marshaller)
 */
const context = new Jsonix.Context(Object.values(schemas));

export const unmarshaller = context.createUnmarshaller();
export const marshaller = context.createMarshaller();

