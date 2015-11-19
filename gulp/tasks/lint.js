'use strict';

import config from '../config';
import gulp from 'gulp';
import eslint from 'gulp-eslint';

gulp.task('lint', function() {
  return gulp.src([config.scripts.src, '!app/js/templates.js', '!app/js/components/lodash.custom.min.js'])
    .pipe(eslint())
    .pipe(eslint.format());
});
