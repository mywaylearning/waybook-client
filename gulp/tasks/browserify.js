'use strict';

import config       from '../config';
import gulp         from 'gulp';
import gulpif       from 'gulp-if';
import gutil        from 'gulp-util';
import source       from 'vinyl-source-stream';
import sourcemaps   from 'gulp-sourcemaps';
import buffer       from 'vinyl-buffer';
import streamify    from 'gulp-streamify';
import watchify     from 'watchify';
import browserify   from 'browserify';
import uglify       from 'gulp-uglify';
import handleErrors from '../util/handleErrors';
import bs           from 'browser-sync';

const bsServer = bs.get(config.browserSync.appName);

// Based on: http://blog.avisi.nl/2014/04/25/how-to-keep-a-fast-build-with-browserify-and-reactjs/
function buildScript(file) {

  var bundler = browserify({
    entries: [config.sourceDir + 'js/' + file],
    debug: true,
    cache: {},
    packageCache: {},
    fullPaths: !global.isProd
  });

  if ( !global.isProd ) {
    bundler = watchify(bundler);

    bundler.on('update', function() {
      rebundle();
      gutil.log('Rebundle...');
    });
  }

  const transforms = [
    { 'name':'debowerify', 'options': {} },
    { 'name':'browserify-ngannotate', 'options': {} },
    { 'name':'localenvify', 'options': {} },
  ];

  transforms.forEach(function(transform) {
    bundler.transform(transform.options, transform.name);
  });

  function rebundle() {
    const stream = bundler.bundle();
    const createSourcemap = global.isProd && config.browserify.prodSourcemap;

    return stream.on('error', handleErrors)
      .pipe(source(file))
      .pipe(gulpif(createSourcemap, buffer()))
      .pipe(gulpif(createSourcemap, sourcemaps.init()))
      .pipe(gulpif(global.isProd, streamify(uglify({
        compress: {
          sequences: true,
          dead_code: true,
          angular: true,
          screw_ie8: true,
          join_vars: true,
          unused: true,
          drop_debugger: true,
          drop_console: true
        },
        output: {
          comments: false
        },
      }))))
      .pipe(gulpif(createSourcemap, sourcemaps.write('./')))
      .pipe(gulp.dest(config.scripts.dest))
      .pipe(bsServer.stream());
  }

  return rebundle();

}

gulp.task('browserify', function() {

  return buildScript('main.js');

});
