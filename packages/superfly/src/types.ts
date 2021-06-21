import { Response } from 'node-fetch'
import { SuperflyRenderContext } from '@deckchairlabs/fastify-superfly'

export type RenderFunction = (context: SuperflyRenderContext) => Response

export type LinksFunction = () => LinkProps[]

export type LinkProps = {}

export type MetaFunction = () => MetaProps

export type MetaProps = {
  /**
   * The document title
   */
  title?: string
  /**
   * The document description
   */
  description?: string
  /**
   * The document charset
   * @default "utf-8"
   */
  charset?: string
  /**
   * The document viewport
   * @default "width=device-width"
   */
  viewport?: string

  [x: string]: string | undefined
}

export type LoaderFunction<
  LoaderData extends object = Record<string, any>
> = () => Promise<LoaderData> | LoaderData
