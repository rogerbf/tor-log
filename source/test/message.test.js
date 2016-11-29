import test from 'tape'
import message from '../library/message'

test(`is a function`, assert => {
  assert.equal(typeof (message), `function`)
  assert.end()
})

test(`expected output`, assert => {
  const payload = { data: `Nov 23 11:27:45.000 [notice] Bootstrapped 45%: Asking for relay descriptors` }
  const expected = { ...payload, message: `Bootstrapped 45%: Asking for relay descriptors` }
  const actual = message(payload)
  assert.deepEqual(actual, expected)
  assert.end()
})
