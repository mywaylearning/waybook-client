'use strict';

import gulp        from 'gulp';
import runSequence from 'run-sequence';

gulp.task('hybrid', ['clean'], function(cb) {

  cb = cb || function() {};

  global.isProd = true;

  runSequence('views', ['styles', 'images', 'fonts', 'browserify'], cb);

});
