import createServer from '../../server'

type CreateServerOptions = {
  root: string
  mode: 'production' | 'development'
  port: number
  host?: string
}

export default async function({
  root,
  mode,
  port,
  host = 'localhost'
}: CreateServerOptions) {
  const server = await createServer({
    root,
    mode
  })

  return server.listen(port, host)
}
