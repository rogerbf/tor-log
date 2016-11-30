import test from 'tape'
import severity from '../library/severity'

test(`is a function`, assert => {
  assert.equal(typeof (severity), `function`)
  assert.end()
})

test(`return payload unmodified payload`, assert => {
  const payload = { data: `hello there` }
  const expected = payload
  assert.deepEqual(severity(payload), expected)
  assert.end()
})

test(`debug`, assert => {
  const payload = { data: `hello [debug]` }
  const expected = { ...payload, severity: `debug` }
  assert.deepEqual(severity(payload), expected)
  assert.end()
})

test(`info`, assert => {
  const payload = { data: `hello [info]` }
  const expected = { ...payload, severity: `info` }
  assert.deepEqual(severity(payload), expected)
  assert.end()
})

test(`notice`, assert => {
  const payload = { data: `hello [notice]` }
  const expected = { ...payload, severity: `notice` }
  assert.deepEqual(severity(payload), expected)
  assert.end()
})

test(`warn`, assert => {
  const payload = { data: `hello [warn]` }
  const expected = { ...payload, severity: `warn` }
  assert.deepEqual(severity(payload), expected)
  assert.end()
})

test(`err`, assert => {
  const payload = { data: `hello [err]` }
  const expected = { ...payload, severity: `err` }
  assert.deepEqual(severity(payload), expected)
  assert.end()
})

test(`expected output`, assert => {
  const payload = { data: `Nov 23 11:27:43.438 [notice] Configuration file "/usr/local/etc/tor/torrc" not present, using reasonable defaults.` }
  const expected = { ...payload, severity: `notice` }
  assert.deepEqual(severity(payload), expected)
  assert.end()
})
