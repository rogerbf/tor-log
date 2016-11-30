import test from 'tape'
import parseLine from '../library/parseLine'

test(`parseLine is a function`, assert => {
  assert.equal(typeof (parseLine), `function`)
  assert.end()
})

test(`expected output`, assert => {
  const line = `Nov 23 11:27:43.000 [notice] Bootstrapped 0%: Starting`
  const expected = {
    data: `Nov 23 11:27:43.000 [notice] Bootstrapped 0%: Starting`,
    timestamp: `2016-11-23T10:27:43.000Z`,
    severity: `notice`,
    message: `Bootstrapped 0%: Starting`
  }
  assert.deepEqual(parseLine(line), expected)
  assert.end()
})
