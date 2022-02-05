// This is a karma config file. For more details see
//   http://karma-runner.github.io/0.13/config/configuration-file.html
// we are also using it with karma-webpack
//   https://github.com/webpack/karma-webpack

var webpackConfig = require('../../build/webpack.test.conf')

module.exports = function karmaConfig (config) {
  config.set({
    // to run in additional browsers:
    // 1. install corresponding karma launcher
    //    http://karma-runner.github.io/0.13/config/browsers.html
    // 2. add it to the `browsers` array below.
    browsers: ['FirefoxHeadless','ChromeHeadless'],
    frameworks: ['mocha', 'sinon-chai'],
    reporters: ['spec', 'coverage', 'junit'],
    files: ['./index.js'],
    autoWatch: true,
    singleRun: true,
    browserDisconnectTimeout: 210000,
    browserNoActivityTimeout: 210000,
    preprocessors: {
      './index.js': ['webpack', 'sourcemap']
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true
    },
    coverageReporter: {
      dir: './coverage',
      reporters: [
        { type: 'lcov', subdir: '.' }
      ]
    },
    junitReporter: {
      
      outputFile: './test-results.xml', // if included, results will be saved as $outputDir/$browserName/$outputFile
    }
  })
}
