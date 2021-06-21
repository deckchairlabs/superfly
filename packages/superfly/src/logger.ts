import pino from 'pino'

export const logger = pino({
  prettyPrint: true,
  prettifier: require('pino-colada')
})
