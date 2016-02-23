'use strict';

import gulp from 'gulp';
import runSequence from 'run-sequence';

/**
 * Gulp task to manage production build
 */
gulp.task('prod', ['clean'], function(callback) {

    callback = callback || function() {};

    global.isProd = true;

    runSequence(
        'views', ['styles', 'images', 'fonts', 'browserify'],
        'revision',
        'revreplace',
        'favicon',
        // 'gzip',
        callback
    );
});