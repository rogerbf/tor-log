# tor-log

## usage

```javascript
import createLogger from 'tor-log'

const log = createLogger(torInstance)
// torInstance is a spawned child process

log.on(`notice`, console.log)
// {
//   data: `Nov 23 11:27:43.446 [notice] Opening Socks listener on 127.0.0.1:9050`,
//   timestamp: `2016-11-23T10:27:43.446Z`,
//   severity: `notice`,
//   message: `Opening Socks listener on 127.0.0.1:9050`
// }
```
