module.exports = (function () {
    'use strict';

    var gulp = require('gulp');
    var $ = require('gulp-load-plugins')();
    var mainBowerFiles = require('gulp-main-bower-files');
    var gulpfilter = require('gulp-filter');

    return {
        build: buildFonts
    };

    function buildFonts () {
        return gulp.src(['bower_components/font-awesome/fonts/*.?(eot|svg|ttf|woff|woff2|otf)', 'bower_components/bootstrap/fonts/*.?(eot|svg|ttf|woff|woff2|otf)'])
            .pipe($.newer('dist/fonts'))
            .pipe(gulp.dest('dist/fonts'));
    }
})();