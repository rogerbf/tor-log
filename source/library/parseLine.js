import toObject from './toObject'
import timestamp from './timestamp'
import severity from './severity'
import message from './message'

export default (line) => (
  [ timestamp, severity, message ].reduce((status, extractor) => {
    return extractor(status)
  }, toObject(line))
)
