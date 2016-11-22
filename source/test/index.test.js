import test from 'tape'
import log from '../index'

test(`log`, assert => {
  assert.ok(log, `exports something`)
  assert.end()
})
