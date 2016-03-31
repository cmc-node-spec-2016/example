'use strict';

var gulp = require('gulp');
var changed = require('gulp-changed');
var plumber = require('gulp-plumber');
var babel = require('gulp-babel');
var eslint = require('gulp-eslint');

var files = {
    libs: 'libs/**/*.js'
};

var babelOptions = {
    presets: ['es2015-node5', 'stage-3']
};

gulp.task('lint', function () {
    gulp.src('libs/**/*.js')
      .pipe(eslint())
      .pipe(eslint.formatEach('compact', process.stderr));
});

gulp.task('libs', function () {
    gulp.src(files.libs)
        .pipe(plumber())
        .pipe(changed('build'))
        .pipe(babel(babelOptions))
        .pipe(gulp.dest('build'));
});

gulp.task('build', ['libs']);

gulp.task('test', ['lint']);

gulp.task('default', ['build'], function() {
    gulp.watch(files.libs, ['libs']);
});
