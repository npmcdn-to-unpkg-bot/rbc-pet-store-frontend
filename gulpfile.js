(function() {
    'use strict';

    // =========================================================================
    // Tasks dependencies
    // =========================================================================
    var gulp = require('gulp');
    var html = require('./gulp/html');
    var stylesheet = require('./gulp/stylesheet');
    var javascript = require('./gulp/javascript');
    var server = require('./gulp/server');
    var tasks = require('./gulp/tasks');
    var fonts = require('./gulp/fonts');
    var test = require('./gulp/test');

    // =========================================================================
    // Default tasks
    // =========================================================================
    gulp.task('default', tasks.default);
    gulp.task('clean', tasks.clean.all);

    // =========================================================================
    // Build tasks
    // =========================================================================
    gulp.task('build', tasks.build);
    gulp.task('build:html:index', html.index.build);
    gulp.task('build:html:template', html.template.build);
    gulp.task('build:javascript:application', javascript.build.application);
    gulp.task('build:javascript:vendor', javascript.build.vendor);
    gulp.task('build:stylesheet:application', stylesheet.build.application);
    gulp.task('build:stylesheet:vendor', stylesheet.build.vendor);
    gulp.task('build:fonts', fonts.build);

    // =========================================================================
    // Server tasks
    // =========================================================================
    gulp.task('server', server.task);
    gulp.task('server:reload', server.reload);
    gulp.task('server:watch:html:index', server.watch.html.index.task);
    gulp.task('server:watch:html:templates', server.watch.html.templates.task);
    gulp.task('server:watch:javascript:application', server.watch.javascript.application);
    gulp.task('server:watch:stylesheets:application', server.watch.stylesheets.application);

    // =========================================================================
    // Testing tasks
    // =========================================================================
    gulp.task('test:unit', test.unit);
})();