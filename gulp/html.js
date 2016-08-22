module.exports = (function () {
    'use strict';

    var gulp = require('gulp');
    var htmlmin = require('gulp-htmlmin');
    var $ = require('gulp-load-plugins')();

    return {
        index: {
            build: buildIndex
        },
        template: {
            build: buildTemplate
        }
    };

    function buildIndex () {
        return gulp.src(['src/index.html'])
            .pipe(htmlmin({collapseWhitespace: true}))
            .pipe(gulp.dest('dist/'));
    }

    function buildTemplate() {
        return gulp.src(['src/app/**/*.html', 'bower_components/angular-bootstrap-datetimepicker/src/**/*.html'])
            .pipe($.minifyHtml({
                empty: true,
                conditionals: true,
                quotes: true,
                loose: true
            }))
            .pipe($.angularTemplatecache('templates.run.js', {
                module: 'rbc.petStore',
                templateHeader: '(function (angular) {\n    \'use strict\';\n\n    angular.module(\'<%= module %>\'<%= standalone %>)\n        .run(ModuleRun);\n\n    ModuleRun.$inject = [\'$templateCache\'];\n\n    function ModuleRun ($templateCache) {\n',
                templateBody: '$templateCache.put(\'<%= url %>\', \'<%= contents %>\');',
                templateFooter: '\n    }\n})(angular);'
            }))
            .pipe(gulp.dest('dist' + '/templates'));
    }

})();
