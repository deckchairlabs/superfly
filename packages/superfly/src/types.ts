import { Response } from 'node-fetch'

export type RenderResolver = (context: any) => Response

export type LinksResolver = () => any[]

export type MetaResolver = () => any

export type LoaderResolver = () => any
