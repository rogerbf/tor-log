import toObject from './toObject'
import timestamp from './timestamp'
import severity from './severity'
import message from './message'

const extractors = [
  timestamp, severity, message
]

export default (line) => {
  return extractors.reduce((status, extractor) => {
    return extractor(status)
  }, toObject(line))
}
