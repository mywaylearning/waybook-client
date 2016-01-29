'use strict';

import config from '../config';
import gulp from 'gulp';
import favicons from 'gulp-favicons';

gulp.task('favicon', function(cb) {

  return gulp.src('resources/icon.png').pipe(favicons({
        appName: 'Waybook',
        appDescription: 'Waybook',
        developerName: 'Waybook',
        developerURL: 'http://way.me/',
        background: '#020307',
        path: 'favicons/',
        url: 'http://way.me/',
        display: 'standalone',
        orientation: 'portrait',
        version: 1.0,
        logging: false,
        online: false,
        html: 'www/index.html'
    })).pipe(gulp.dest("./www/favicons/"));

});
