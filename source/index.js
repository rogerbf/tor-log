import parseTransform from './library/parseTransform'
import lumberman from 'lumberman'
import split from 'buffer-split-transform'

export default readable => {
  return lumberman({
    source: readable,
    transform: [ split(), parseTransform() ],
    emit: [
      { eventName: `debug`, filter: data => data.severity === `debug` },
      { eventName: `info`, filter: data => data.severity === `info` },
      { eventName: `notice`, filter: data => data.severity === `notice` },
      { eventName: `warn`, filter: data => data.severity === `warn` },
      { eventName: `err`, filter: data => data.severity === `err` }
    ]
  })
}
