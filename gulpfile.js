var gulp = require('gulp');
var react = require('gulp-react')

gulp.task('react', function () {
  return gulp.src('assets/jsx/app.jsx')
    .pipe(react())
    .pipe(gulp.dest('assets/js'))
})

gulp.task('default', ['react'])
