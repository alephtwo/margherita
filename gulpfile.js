var gulp = require('gulp')
var del = require('del')
var react = require('gulp-react')
var uglify = require('gulp-uglify')
var concat = require('gulp-concat')

gulp.task('clean', function () {
  return del('public/')
})

gulp.task('react', function () {
  return gulp.src('assets/jsx/app.jsx')
    .pipe(react())
    .pipe(gulp.dest('assets/js'))
})

gulp.task('css', function () {
  return gulp.src([
    'assets/css/*.css',
    'bower_components/bootstrap/dist/css/bootstrap.min.css',
    'bower_components/font-awesome/css/font-awesome.min.css'
  ]).pipe(gulp.dest('public/css'))
})

gulp.task('js', function () {
  return gulp.src([
    'bower_components/jquery/dist/jquery.min.js',
    'bower_components/underscore/underscore-min.js',
    'bower_components/bootstrap/dist/js/bootstrap.min.js',
    'bower_components/immutable/dist/immutable.min.js',
    'bower_components/react/react.min.js',
    'assets/js/*.js'
  ]).pipe(uglify())
    .pipe(concat('app.js'))
    .pipe(gulp.dest('public/js'))
})

gulp.task('fonts', function () {
  return gulp.src([
    'bower_components/font-awesome/fonts/*'
  ]).pipe(gulp.dest('public/fonts'))
})

gulp.task('img', function () {
  return gulp.src([
    'assets/img/*'
  ]).pipe(gulp.dest('public/img'))
})

gulp.task('mp3', function () {
  return gulp.src([
    'assets/mp3/*'
  ]).pipe(gulp.dest('public/mp3'))
})

gulp.task('default', ['react', 'css', 'js', 'fonts', 'img', 'mp3'])
