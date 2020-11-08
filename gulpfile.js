import gulp from 'gulp';
import nodemon from 'gulp-nodemon';
import plumber from 'gulp-plumber';
import livereload from 'gulp-livereload';
import sass from 'gulp-sass';


import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

gulp.task('sass', () => {
  return gulp.src('./public/css/*.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest('./public/css'))
    .pipe(livereload());
});

gulp.task('watch', () => {
  return gulp.watch('./public/css/*.scss', ['sass']);
});

gulp.task('develop', () => {
  livereload.listen();
  return nodemon({
    script: 'app.js',
    ext: 'js coffee hbs',
    stdout: false
  }).on('readable', function () {
    this.stdout.on('data', (chunk) => {
      if (/^Express server listening on port/.test(chunk)) {
        livereload.changed(__dirname);
      }
    });
    this.stdout.pipe(process.stdout);
    this.stderr.pipe(process.stderr);
  });
});

gulp.task('default', gulp.series('sass', 'develop', 'watch'));
