import { Transform } from 'stream'
import parseLine from './parseLine'

export default () => {
  return new Transform({
    transform (chunk, encoding, next) {
      this.push(parseLine(chunk.toString()))
      next()
    },
    objectMode: true
  })
}
