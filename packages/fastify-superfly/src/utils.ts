import { FastifyRequest } from 'fastify'
import { Request, Response, Headers } from 'node-fetch'
import { prependToStream } from './stream'

export function prependDoctype(response: Response) {
  const contentType = response.headers.get('content-type')
  const docType = contentType === 'text/html' ? '<!DOCTYPE html>' : undefined
  const body = prependToStream([docType], response.body)

  return body
}

export function createInitialRequestContext(
  request: FastifyRequest,
  isProduction: boolean
) {
  return {
    url: request.url,
    isProduction,
    responseStatusCode: 200,
    responseHeaders: new Headers(),
    request: new Request(request.url, {
      method: request.method,
      headers: new Headers()
    })
  }
}
