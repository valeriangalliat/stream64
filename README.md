# stream64 [![npm version](http://img.shields.io/npm/v/stream64.svg?style=flat-square)](https://www.npmjs.org/package/stream64)

> Base64 encode/decode stream.

Example
-------

```js
const Stream = require('stream')
const stream64 = require('stream64')

const stream = () => {
  const s = new Stream.Readable()
  s._read = () => {}
  return s
}

const s1 = stream()
s1.pipe(stream64.encode()).pipe(process.stdout)
s1.push('Hello, ') // 'Hello,' -> SGVsbG8s
s1.push('world\n') // ' world' -> IHdvcmxk
s1.push(null) // '!\n' -> IQo=

const s2 = stream()
s2.pipe(stream64.decode()).pipe(process.stdout)
s2.push('SGVsbG8sIHd') // SGVsbG8s -> 'Hello,'
s2.push('vcmxkIQo=') // IHdvcmxkIQo= -> ' world!\n'
s2.push(null)
```
