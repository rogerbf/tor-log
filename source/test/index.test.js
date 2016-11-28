import test from 'tape'
import log from '../index'

test(`exports a function`, assert => {
  assert.equal(typeof (log), `function`)
  assert.end()
})
