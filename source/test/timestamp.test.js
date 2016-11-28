import test from 'tape'
import timestamp from '../library/timestamp.js'

test(`is a function`, assert => {
  assert.equal(typeof (timestamp), `function`)
  assert.end()
})

test(`expected output #1`, assert => {
  const payload = { data: `Nov 23 11:27:43.438 [notice] Configuration file "/usr/local/etc/tor/torrc" not present, using reasonable defaults.` }
  const expected = {
    data: `Nov 23 11:27:43.438 [notice] Configuration file "/usr/local/etc/tor/torrc" not present, using reasonable defaults.`,
    timestamp: `2016-11-23T10:27:43.438Z`
  }
  const actual = timestamp(payload)
  assert.deepEqual(actual, expected)
  assert.end()
})

test(`expected output #2`, assert => {
  const payload = { data: `Nov 23 11:27:48.000 [notice] Bootstrapped 100%: Done` }
  const expected = {
    data: `Nov 23 11:27:48.000 [notice] Bootstrapped 100%: Done`,
    timestamp: `2016-11-23T10:27:48.000Z`
  }
  const actual = timestamp(payload)
  assert.deepEqual(actual, expected)
  assert.end()
})
