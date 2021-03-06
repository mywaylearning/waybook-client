'use strict';

export default {

  browserSync: {
    appName: 'Waybook',
    browserPort: 3000,
    UIPort: 3001
  },

  sourceDir: './app/',
  buildDir: './www/',

  styles: {
    src: 'app/styles/**/*.scss',
    dest: 'www/css',
    prodSourcemap: false,
    sassIncludePaths: [
      './node_modules/',
      './bower_components/'
    ]
  },

  scripts: {
    src: 'app/js/**/*.js',
    dest: 'www/js'
  },

  images: {
    src: ['app/images/**/*', 'bower_components/intl-tel-input/build/img/*'],
    dest: 'www/img'
  },

  fonts: {
    src: ['app/fonts/**/*', 'bower_components/ionic/fonts/*'],
    dest: 'www/fonts'
  },

  data: {
    src: ['app/data/**/*'],
    dest: 'www/data'
  },

  views: {
    index: 'app/index.html',
    src: 'app/js/**/*.html',
    dest: 'app/js'
  },

  gzip: {
    src: 'www/**/*.{html,xml,json,css,js,js.map,css.map}',
    dest: 'www/',
    options: {}
  },

  browserify: {
    bundleName: 'app.js',
    prodSourcemap: false
  },

  test: {
    karma: 'test/karma.conf.js',
    protractor: 'test/protractor.conf.js'
  },

  init: function() {
    this.views.watch = [
      this.views.index,
      this.views.src
    ];

    return this;
  }

}.init();
