var gulp = require('gulp'),
	sass = require('gulp-sass'),
	browserSync = require('browser-sync').create(),
	autoprefixer = require('gulp-autoprefixer');

var path = {
	sass: {
		src: 'app/sass/**/*.{scss,sass}',
		dest: 'app/css',
	}
};

gulp.task('sass', function() {
	return gulp.src(path.sass.src)
		.pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
		.pipe(autoprefixer({
            browsers: ['last 10 versions'],
            cascade: false
        }))
		.pipe(gulp.dest(path.sass.dest))
});

gulp.task('watch', function () {
  gulp.watch(path.sass.src, gulp.series('sass'));
});

gulp.task('serve', function () {
	browserSync.init({
    server: {
      baseDir: "app"
    },
    port: 3000
  });
  browserSync.watch(path.sass.dest, browserSync.reload)
});

gulp.task('default', gulp.series('sass', 
	gulp.parallel('watch', 'serve')  
));