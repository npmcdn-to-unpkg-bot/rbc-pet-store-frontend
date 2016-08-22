module.exports = function(config) {
    'use strict';

    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '../../',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],

        // list of files / patterns to load in the browser
        files: [
            'dist/libraries.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'src/app/**/*.module.js',
            'src/app/**/*.js',
            'dist/templates/templates.run.js',
            'src/tests/unit/**/*.spec.js'
        ],



        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['PhantomJS'],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true,

        // Retries 5 times after 10 seconds of inactivity
        browserDisconnectTimeout: 10000,
        browserNoActivityTimeout: 10000,
        browserDisconnectTolerance: 5
    });
};
