module.exports = (function () {
    'use strict';

    var gulp = require('gulp');
    var batch = require('gulp-batch');
    var watch = require('gulp-watch');
    var runSequence = require('run-sequence');
    var browserSync = require('browser-sync').create();

    return {
        task: serverTask,
        reload: reload,
        watch: {
            html: {
                index: {
                    task: watchIndex
                },
                templates: {
                    task: watchTemplates
                }
            },
            javascript: {
                application: watchJavascriptApplication
            },
            stylesheets: {
                application: watchStylesheetsApplication
            }
        }
    };

    function serverTask (callback) {
        var browserSyncConfig = {
            open: false,
            port: 3000,
            server: {
                baseDir: 'dist'
            }
        };
        browserSync.init(browserSyncConfig, watchTask(callback));
    }

    function reload (callback) {
        browserSync.reload();
        callback();
    }

    function watchTask (callback) {
        return function () {
            watch (
                'src/index.html',
                batch (function (events, callback) {
                    gulp.start('server:watch:html:index', callback);
                })
            );

            watch (
                ['src/app/**/*.js', 'src/*.js'],
                batch (function (events, callback) {
                    gulp.start('server:watch:javascript:application', callback);
                })
            );

            watch (
                'src/app/**/*.html',
                batch (function (events, callback) {
                    gulp.start('server:watch:html:templates', callback);
                })
            );

            watch (
                'src/app/**/*.less',
                batch (function (events, callback) {
                    gulp.start('server:watch:stylesheets:application', callback);
                })
            );

            callback();
        };
    }

    function watchIndex (callback) {
        runSequence (
            'build:html:index',
            'server:reload',
            callback
        );
    }

    function watchTemplates (callback) {
        runSequence (
            'build:html:template',
            'server:reload',
            callback
        );
    }

    function watchJavascriptApplication (callback) {
        runSequence(
            'build:javascript:application',
            'server:reload',
            callback
        );
    }

    function watchStylesheetsApplication(callback) {
        runSequence(
            'build:stylesheet:application',
            'server:reload',
            callback
        );
    }
})();