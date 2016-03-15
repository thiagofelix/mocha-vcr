import fs from 'fs'
import nock from 'nock'
import path from 'path'
import mkdirp from 'mkdirp'

const reset = () => {
  nock.cleanAll()
  nock.recorder.clear()
  nock.restore()
}

const resolve = (cassette) => (
  path.resolve(path.join('cassettes', cassette + '.json'))
)

const exists = (cassette) => (
  fs.existsSync(resolve(cassette))
)

const capture = () => (
  nock.recorder.rec({
    output_objects: true,
    dont_print: true
  })
)

const load = (cassette) => {
  if (!nock.isActive()) {
    nock.activate()
  }
  nock.load(resolve(cassette))
}

const write = (fileName, content = []) => {
  mkdirp.sync(path.dirname(fileName))
  fs.writeFileSync(fileName, JSON.stringify(content))
}

const record = (cassette) => {
  reset()
  if (exists(cassette)) {
    load(cassette)
  } else {
    capture()
  }
}

const save = (cassette) => {
  if (!exists(cassette)) {
    write(resolve(cassette), nock.recorder.play())
  }
}

module.exports = {save, record}
