import test from 'tape'
import parse from '../library/parseTransform'
import { Readable } from 'stream'

const createTestStream = (data, objectMode = false) => {
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

const testData = [
  `Nov 23 11:27:43.438 [notice] Configuration file "/usr/local/etc/tor/torrc" not present, using reasonable defaults.`,
  `Nov 23 11:27:43.446 [warn] Warning from libevent: kq_init: detected broken kqueue; not using.: Invalid argument`,
  `Nov 23 11:27:43.446 [notice] Opening Socks listener on 127.0.0.1:9050`
]

test(`parser`, assert => {
  assert.equal(typeof (parse), `function`)
  assert.equal(parse().constructor.name, `Transform`)
  assert.end()
})

test(`expected output`, assert => {
  const source = createTestStream(testData)
  const parser = parse()

  const expected = {
    eventCount: 3
  }

  const actual = {
    eventCount: 0,
    data: []
  }

  parser.on(`data`, data => {
    actual.data.push(data)
    actual.eventCount = actual.eventCount + 1
  })

  parser.on(`end`, () => {
    assert.deepEqual(actual.eventCount, expected.eventCount)
    assert.end()
  })

  source.pipe(parser)
})
