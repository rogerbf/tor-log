# tor-log

Parses stdout from  a `tor` instance and hooks up separate emitters for each severity level (debug, info, notice, warn, err).

## usage

```javascript
import parseLog from 'tor-log'

const log = parseLog(tor)
// tor is a child process, log is a transform stream

log.on(`notice`, console.log)
// {
//   data: `Nov 23 11:27:43.446 [notice] Opening Socks listener on 127.0.0.1:9050`,
//   timestamp: `2016-11-23T10:27:43.446Z`,
//   severity: `notice`,
//   message: `Opening Socks listener on 127.0.0.1:9050`
// }
log.pipe(someDestination)
```
