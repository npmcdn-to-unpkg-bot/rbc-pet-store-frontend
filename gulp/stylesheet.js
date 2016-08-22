module.exports = (function() {
    'use strict';
    var gulp = require('gulp');
    var cleanCss = require('gulp-clean-css');
    var $ = require('gulp-load-plugins')();
    var source = [
          'bower_components/bootstrap/dist/css/bootstrap.css',
          'bower_components/font-awesome/css/font-awesome.css',
          'bower_components/bootcards/dist/css/bootcards-desktop.min.css',
          'bower_components/angular-bootstrap-datetimepicker/src/css/datetimepicker.css'
    ];

    return {
        build: {
            vendor: buildVendors,
            application: buildApplication
        }
    };

    function buildVendors() {
        return gulp.src(source)
            .pipe($.concat('styles/libraries.css'))
            .pipe(cleanCss())
            .pipe(gulp.dest('dist'));
    }

    function buildApplication() {
        return gulp.src('src/app/**/*.less')
            .pipe($.less())
            .pipe($.concat('styles/application.css'))
            .pipe(gulp.dest('dist'));
    }
})();