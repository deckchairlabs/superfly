import createServer from '../../server'

export default async function(
  root: string,
  mode: 'production' | 'development'
) {
  const port = process.env.PORT || 3000
  const host = 'localhost'

  const server = await createServer({
    root,
    mode
  })

  return server.listen(port, host)
}
