import timestamp from './timestamp'
import severity from './severity'
import message from './message'

export default line => (
  [ timestamp, severity, message ]
    .reduce((status, extractor) => extractor(status), { data: line })
)
