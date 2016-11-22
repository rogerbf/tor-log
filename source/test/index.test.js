import test from 'tape'
import tor-log from '../index'

test(`tor-log`, assert => {
  assert.ok(tor-log, `exports something`)
  assert.end()
})

