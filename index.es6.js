const through = require('through2-sync')
const empty = new Buffer(0)

// Concatenate optional extra buffer and chunk.
const mkConcat = (concat, empty) => (extra, chunk) =>
  concat([extra || empty, chunk])

const concat = mkConcat(Buffer.concat, empty)
// const concatString = mkConcat(([x, xs]) => x.concat(...xs), '')

// Get a chunk multiple of given size with optional extra data.
function group (size, chunk) {
  const remaining = chunk.length % size
  const length = chunk.length - remaining

  return remaining === 0
    ? [null, chunk]
    : [chunk.slice(length), chunk.slice(0, length)]
}

// Chunk by given size and call the transform function to stream data.
const mkTransform = (size, transform) => (extra=null) =>
  through(
    chunk => {
      ;[extra, chunk] = [empty, concat(extra, chunk)]
      ;[extra, chunk] = group(size, chunk)

      return transform(chunk)
    },
    () => extra && transform(extra)
  )

exports.encode = mkTransform(3, x => x.toString('base64'))
exports.decode = mkTransform(4, x => new Buffer(x.toString(), 'base64'))
