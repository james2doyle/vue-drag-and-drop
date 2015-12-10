/* global require */
var gulp = require('gulp');
var livereload = require('gulp-livereload');

gulp.task('reload', function() {
  gulp.src('**/*.{php,html}')
  gulp.src('js/main.js')
  .pipe(livereload());
});

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('**/*.{php,html}', ['reload']);
  gulp.watch('js/main.js', ['reload']);
});

gulp.task('default', [], function() {
  // fired before 'finished' event
});
