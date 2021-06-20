import merge2 from 'merge2'
import { Stream } from 'stream'

export function prependToStream(
  iterable: Iterable<any>,
  stream: NodeJS.ReadableStream
) {
  return merge2(Stream.Readable.from(iterable), stream)
}

export function appendToStream(
  iterable: Iterable<any>,
  stream: NodeJS.ReadableStream
) {
  return merge2(stream, Stream.Readable.from(iterable))
}
