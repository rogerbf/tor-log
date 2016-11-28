import { Transform } from 'stream'

export default () => {
  return new Transform({
    transform (chunk, encoding, next) {
      this.push(chunk.toString())
      next()
    },
    objectMode: true
  })
}
