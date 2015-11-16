'use strict';

import gulp        from 'gulp';
import runSequence from 'run-sequence';

gulp.task('dev', ['clean'], function(cb) {

  global.isProd = false;

  runSequence(['images', 'fonts', 'data', 'views', 'styles', 'browserify'], 'watch', cb);

});
