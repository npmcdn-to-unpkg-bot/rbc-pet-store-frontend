module.exports = (function () {
    'use strict';

    var gulp = require('gulp');
    var concat = require('gulp-concat');
    var uglify = require('gulp-uglify');
    var gutil = require('gulp-util');
    var mainBowerFiles = require('gulp-main-bower-files');
    var gulpfilter = require('gulp-filter');
    var $ = require('gulp-load-plugins')();

    return {
        build: {
            application: buildApplication,
            vendor: buildVendor
        }
    };

    function buildApplication () {
        return gulp.src(
            [
                'src/app/**/*.module.js',
                'src/app/**/*.js'
            ])
            .pipe($.newer('dist/application.js'))
            .pipe(uglify().on('error', gutil.log))
            .pipe(concat('application.js'))
            .pipe(gulp.dest('dist/'));
    }

    function buildVendor () {
        return gulp.src('bower.json')
            .pipe(mainBowerFiles( ))
            .pipe($.newer('dist/libraries.js'))
            .pipe(gulpfilter('**/*.js'))
            .pipe(uglify().on('error', gutil.log))
            .pipe(concat('libraries.js'))
            .pipe(gulp.dest('dist/'));
    }
})();