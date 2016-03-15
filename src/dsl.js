import Mocha from 'mocha'
import BDDInterface from 'mocha/lib/interfaces/bdd'
import VCRRecorder from './vcr'

class MochaVCR extends BDDInterface {
  static create (suite) {
    return new MochaVCR(suite)
  }

  constructor (suite) {
    super(suite)
    suite.on('pre-require', this.preRequire.bind(this))
  }

  preRequire (context, file, mocha) {
    context.vcr = this.vcr.bind(context)
  }

  vcr (cassette, test) {
    if (!test) {
      test = cassette
      cassette = test.fullTitle()
    }

    const fn = test.fn
    test.fn = () => {
      try {
        VCRRecorder.record(cassette)
        let val = fn(...arguments)
        let save = () => VCRRecorder.save(cassette)

        Promise.resolve(val).then(save, save)

        return val
      } catch (e) {
        VCRRecorder.save(cassette)
        throw e
      }
    }
  }
}

export default Mocha.interfaces['vcr'] = MochaVCR.create
