module.exports = (function () {
    'use strict';

    var gulp = require('gulp');
    var runSequence = require('run-sequence');
    var del = require('del');

    return {
        default: defaultTask,
        build: build,
        clean: {
            all: cleanAll
        }
    };

    function defaultTask (callback) {
        runSequence (
            'build',
            'test:unit',
            'server',
            callback
        );
    }

    function build (callback) {
        runSequence (
            [
                'build:stylesheet:vendor',
                'build:stylesheet:application'
            ],
            [
                'build:javascript:vendor',
                'build:javascript:application'
            ],
            'build:fonts',
            'build:html:template',
            'build:html:index',
            callback
        );
    }

    function cleanAll (callback) {
       return del('dist', callback);
    }
})();
