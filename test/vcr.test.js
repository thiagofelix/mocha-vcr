import fs from 'fs'
import nock from 'nock'
import sinon from 'sinon'
import {assert} from 'chai'
import {record, save} from '../src/vcr'

describe('VCR', () => {
  beforeEach(() => {
    sinon.stub(nock, 'load')
    sinon.spy(nock.recorder, 'rec')
    sinon.spy(nock.recorder, 'play')
    sinon.stub(fs, 'existsSync')
    sinon.stub(fs, 'writeFileSync')
  })

  afterEach(() => {
    nock.load.restore()
    nock.recorder.rec.restore()
    nock.recorder.play.restore()
    fs.existsSync.restore()
    fs.writeFileSync.restore()
  })

  describe('record', () => {
    context('new cassete', () => {
      it('start recording', () => {
        fs.existsSync.returns(false)
        record('new cassete')

        assert.isFalse(nock.load.called)
        assert.isTrue(nock.recorder.rec.calledOnce)
        assert.isTrue(nock.recorder.rec.calledWith({
          output_objects: true,
          dont_print: true
        }))
      })
    })

    context('existing cassete', () => {
      it('loads previous record', () => {
        fs.existsSync.returns(true)
        record('existing cassete')

        assert.include(nock.load.getCall(0).args[0], 'cassettes/existing cassete.json')
        assert.isFalse(nock.recorder.rec.called)
      })
    })
  })

  describe('save', () => {
    context('existing cassete', () => {
      it('does nothing', () => {
        fs.existsSync.returns(true)
        save('cassette')
        assert.isFalse(nock.recorder.play.called)
        assert.isFalse(fs.writeFileSync.called)
      })
    })

    context('new cassete', () => {
      it('saves cassete file', () => {
        save('cassette')
        assert.isTrue(nock.recorder.play.calledOnce)
        assert.include(fs.writeFileSync.getCall(0).args[0], 'cassettes/cassette.json')
      })
    })
  })
})
