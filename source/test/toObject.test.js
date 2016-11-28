import test from 'tape'
import toObject from '../library/toObject.js'

test(`is a function`, assert => {
  assert.equal(typeof (toObject), `function`)
  assert.end()
})

test(`expected output`, assert => {
  assert.deepEqual(toObject(`some data`), { data: `some data` })
  assert.end()
})
