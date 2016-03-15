#  [Mocha VCR](http://thiagofelix.github.io/mocha-vcr)

[![NPM Package](https://img.shields.io/npm/v/mocha-vcr.svg?style=flat-square)](https://www.npmjs.org/package/mocha-vcr)
[![Build Status](https://travis-ci.org/thiagofelix/mocha-vcr.svg?branch=master)](https://travis-ci.org/thiagofelix/mocha-vcr)

[![Dependencies](https://david-dm.org/thiagofelix/mocha-vcr/status.svg?style=flat-square)](https://david-dm.org/thiagofelix/mocha-vcr#info=dependencies)
[![Dev Dependencies](https://david-dm.org/thiagofelix/mocha-vcr/dev-status.svg?style=flat-square)](https://david-dm.org/thiagofelix/mocha-vcr#info=devDependencies)
[![Peer Dependencies](https://david-dm.org/thiagofelix/mocha-vcr/peer-status.svg?style=flat-square)](https://david-dm.org/thiagofelix/mocha-vcr#info=devDependencies)

[![semantic-release][semantic-image] ][semantic-url]  
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)  

[semantic-image]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-url]: https://github.com/semantic-release/semantic-release

This is a extension to [Mocha BDD DSL](https://mochajs.org/#bdd) intended to
enable recording your test suite's HTTP interactions and replay them during
future test runs for fast, deterministic, accurate tests.

**fictional example**
```javascript
describe('Proxy Client', function () {
  // Specify cassette name 'google.com'
  vcr('google.com', it('forward requests to google.com', function () {
    let site = proxy.request('google.com')
    expect(site.title).to.equal('google.com')
  }))

  // Auto generate cassete name from test title
  vcr(it('forward requests to github.com', function () {
    let site = proxy.request('github.com')
    expect(site.title).to.equal('github.com')
  })
})
```

**running mocha**
```
mocha --require mocha-vcr --ui vcr
```


*License: MIT*
