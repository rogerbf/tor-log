import test from 'tape'
import severity from '../library/severity'

test(`is a function`, assert => {
  assert.equal(typeof (severity), `function`)
  assert.end()
})

test(`expected output`, assert => {
  const payload = { data: `Nov 23 11:27:43.438 [notice] Configuration file "/usr/local/etc/tor/torrc" not present, using reasonable defaults.` }
  const expected = { ...payload, severity: `notice` }
  const actual = severity(payload)
  assert.deepEqual(actual, expected)
  assert.end()
})
