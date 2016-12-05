# tor-log

Parses tor stdout and adds named events for each severity level.

## usage

```javascript
import consumeStdout from 'tor-log'

const log = consumeStdout(torInstance)
// torInstance is a spawned child process

log.on(`notice`, console.log)
// {
//   data: `Nov 23 11:27:43.446 [notice] Opening Socks listener on 127.0.0.1:9050`,
//   timestamp: `2016-11-23T10:27:43.446Z`,
//   severity: `notice`,
//   message: `Opening Socks listener on 127.0.0.1:9050`
// }
```
