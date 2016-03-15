import sinon from 'sinon'
import {assert} from 'chai'
import recorder from '../src/vcr'

describe('Mocha VCR DSL', () => {
  beforeEach(() => {
    sinon.spy(recorder, 'record')
    sinon.spy(recorder, 'save')
  })
  afterEach(() => {
    recorder.record.restore()
    recorder.save.restore()
  })

  describe('.vcr', () => {
    vcr(it('generates cassette name automatically', () => {
      assert.include(recorder.record.getCall(0).args[0], 'Mocha VCR DSL .vcr generates cassette name automatically')
    }))
  })
})
