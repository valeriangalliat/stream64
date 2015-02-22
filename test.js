const assert = require('assert')
const concat = require('concat-stream')
const Stream = require('stream')
const stream64 = require('./')

const stream = () => {
  const s = new Stream.Readable()
  s._read = () => {}
  return s
}

const s1 = stream()

s1
  .pipe(stream64.encode())
  .pipe(concat(output => assert.equal(output, 'SGVsbG8sIHdvcmxkIQo=')))

s1.push('Hello, ')
s1.push('world!\n')
s1.push(null)

const s2 = stream()

s2
  .pipe(stream64.decode())
  .pipe(concat(output => assert.equal(output.toString(), 'Hello, world!\n')))

s2.push('SGVsbG8sIHd')
s2.push('vcmxkIQo=')
s2.push(null)
