import test from 'tape'
import { Readable } from 'stream'
import consumeStdout from '../index'

const createTestStream = (data = [], objectMode = false) => {
  return Object.assign(
    new Readable({
      read () {
        if (this.data.length > 0) {
          this.push(this.data.shift())
        } else {
          this.push(null)
        }
      },
      objectMode
    }),
    { data: [ ...data ] }
  )
}

const testdata = [
  `Nov 23 11:27:43.446 [warn] Warning from libevent: kq_init: detected broken kqueue; not using.: Invalid argument\n`,
  `Nov 23 11:27:43.446 [notice] Opening Socks listener on 127.0.0.1:9050\n`,
  `Dec 01 19:05:18.000 [debug] parse_dir_authority_line: Trusted 100 dirserver at\n`,
  `Dec 01 19:05:18.000 [info] entry_guards_parse_state: Read 117\n`,
  `Dec 01 19:06:55.105 [err] Reading config failed--see warnings above.\n`
]

test(`exports a function`, assert => {
  const source = createTestStream()
  const sourceOnObject = { stdout: source }
  assert.equal(consumeStdout(source).constructor.name, `Transform`)
  assert.equal(consumeStdout(sourceOnObject).constructor.name, `Transform`)
  assert.end()
})

test(`returns a transform stream`, assert => {
  assert.equal()
  assert.end()
})

test(`expected output`, assert => {
  const source = createTestStream(testdata)

  const expected = {
    warn: {
      eventCount: 1,
      data: {
        data: `Nov 23 11:27:43.446 [warn] Warning from libevent: kq_init: detected broken kqueue; not using.: Invalid argument`,
        timestamp: `2016-11-23T10:27:43.446Z`,
        severity: `warn`,
        message: `Warning from libevent: kq_init: detected broken kqueue; not using.: Invalid argument`
      }
    },
    notice: {
      eventCount: 1,
      data: {
        data: `Nov 23 11:27:43.446 [notice] Opening Socks listener on 127.0.0.1:9050`,
        timestamp: `2016-11-23T10:27:43.446Z`,
        severity: `notice`,
        message: `Opening Socks listener on 127.0.0.1:9050`
      }
    },
    debug: {
      eventCount: 1,
      data: {
        data: `Dec 01 19:05:18.000 [debug] parse_dir_authority_line: Trusted 100 dirserver at`,
        timestamp: `2016-12-01T18:05:18.000Z`,
        severity: `debug`,
        message: `parse_dir_authority_line: Trusted 100 dirserver at`
      }
    },
    info: {
      eventCount: 1,
      data: {
        data: `Dec 01 19:05:18.000 [info] entry_guards_parse_state: Read 117`,
        timestamp: `2016-12-01T18:05:18.000Z`,
        severity: `info`,
        message: `entry_guards_parse_state: Read 117`
      }
    },
    err: {
      eventCount: 1,
      data: {
        data: `Dec 01 19:06:55.105 [err] Reading config failed--see warnings above.`,
        timestamp: `2016-12-01T18:06:55.105Z`,
        severity: `err`,
        message: `Reading config failed--see warnings above.`
      }
    },
    data: {
      eventCount: 5,
      data: [
        {
          data: `Nov 23 11:27:43.446 [warn] Warning from libevent: kq_init: detected broken kqueue; not using.: Invalid argument`,
          timestamp: `2016-11-23T10:27:43.446Z`,
          severity: `warn`,
          message: `Warning from libevent: kq_init: detected broken kqueue; not using.: Invalid argument`
        },
        {
          data: `Nov 23 11:27:43.446 [notice] Opening Socks listener on 127.0.0.1:9050`,
          timestamp: `2016-11-23T10:27:43.446Z`,
          severity: `notice`,
          message: `Opening Socks listener on 127.0.0.1:9050`
        },
        {
          data: `Dec 01 19:05:18.000 [debug] parse_dir_authority_line: Trusted 100 dirserver at`,
          timestamp: `2016-12-01T18:05:18.000Z`,
          severity: `debug`,
          message: `parse_dir_authority_line: Trusted 100 dirserver at`
        },
        {
          data: `Dec 01 19:05:18.000 [info] entry_guards_parse_state: Read 117`,
          timestamp: `2016-12-01T18:05:18.000Z`,
          severity: `info`,
          message: `entry_guards_parse_state: Read 117`
        },
        {
          data: `Dec 01 19:06:55.105 [err] Reading config failed--see warnings above.`,
          timestamp: `2016-12-01T18:06:55.105Z`,
          severity: `err`,
          message: `Reading config failed--see warnings above.`
        }
      ]
    }
  }

  const actual = {
    warn: {
      eventCount: 0,
      data: undefined
    },
    notice: {
      eventCount: 0,
      data: undefined
    },
    debug: {
      eventCount: 0,
      data: undefined
    },
    info: {
      eventCount: 0,
      data: undefined
    },
    err: {
      eventCount: 0,
      data: undefined
    },
    data: {
      eventCount: 0,
      data: []
    }
  }

  const log = consumeStdout(source)

  assert.equal(log._readableState.objectMode, true)

  log.on(`warn`, data => {
    actual.warn.eventCount = actual.warn.eventCount + 1
    actual.warn.data = data
  })
  log.on(`notice`, data => {
    actual.notice.eventCount = actual.notice.eventCount + 1
    actual.notice.data = data
  })
  log.on(`debug`, data => {
    actual.debug.eventCount = actual.debug.eventCount + 1
    actual.debug.data = data
  })
  log.on(`info`, data => {
    actual.info.eventCount = actual.info.eventCount + 1
    actual.info.data = data
  })
  log.on(`err`, data => {
    actual.err.eventCount = actual.err.eventCount + 1
    actual.err.data = data
  })
  log.on(`data`, data => {
    actual.data.eventCount = actual.data.eventCount + 1
    actual.data.data.push(data)
  })

  log.on(`end`, () => {
    assert.deepEqual(actual.warn, expected.warn)
    assert.deepEqual(actual.notice, expected.notice)
    assert.deepEqual(actual.debug, expected.debug)
    assert.deepEqual(actual.info, expected.info)
    assert.deepEqual(actual.err, expected.err)
    assert.deepEqual(actual.data, expected.data)
    assert.end()
  })
})
