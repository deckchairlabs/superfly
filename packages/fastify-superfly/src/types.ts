import { ViteDevServer } from 'vite'
import { Headers, Request, Response } from 'node-fetch'
import { FastifyCompressOptions } from 'fastify-compress'
import { FastifyStaticOptions } from 'fastify-static'

export type SuperflyPluginOptions = {
  createRenderer: SuperflyRendererFactory
  isProduction: boolean
  root?: string
  compress?: FastifyCompressOptions
  assets?: FastifyStaticOptions
}

export type SuperflyRendererFactory = (
  options: SuperflyRendererOptions
) => SuperflyRenderer

export type SuperflyRendererOptions = {
  viteDevServer?: ViteDevServer
  isProduction: boolean
  root?: string
  base?: string
}

export type SuperflyRenderer<TResult = Response> = (
  context: SuperflyContext
) => Promise<SuperflyRendererResult<TResult>>

export type SuperflyContext = {
  url: string
  isProduction: boolean
  request: Request
  responseStatusCode: number
  responseHeaders: Headers
}

export type SuperflyRendererResult<TResult = Response> =
  | { nothingRendered: true; renderResult: undefined; statusCode: undefined }
  | {
      nothingRendered: false
      renderResult: TResult
      statusCode: 200 | 404 | 500
    }
