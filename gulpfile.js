var gulp = require('gulp');

var sass = require('gulp-sass'),
		browserSync = require('browser-sync').create(),
		useref = require('gulp-useref'),
		uglify = require('gulp-uglify'),
		gulpIf = require('gulp-if'),
		autoprefixer = require('gulp-autoprefixer'),
		cssnano = require('gulp-cssnano'),
		imagemin = require('gulp-imagemin'),
		imageminOptipng = require('imagemin-optipng'),
		cache = require('gulp-cache'),
		del = require('del'),
		runSequence = require('run-sequence');

gulp.task('browserSync', function() {
	browserSync.init({
		server: {
			baseDir: 'app'
		},
		browser: 'google chrome',
		notify: false
	});
});

gulp.task('sass', function() {
	return gulp.src('app/scss/**/*')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.reload({
			stream: true
		}))
});

gulp.task('watch', ['browserSync', 'sass'], function() {
	gulp.watch('app/scss/**/*', ['sass']);
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/js/**/*', browserSync.reload);
});

gulp.task('useref', function() {
	return gulp.src('app/*.html')
		.pipe(useref())
		.pipe(gulpIf('*.js', uglify()))
		.pipe(gulpIf('*.css', cssnano()))
		.pipe(gulp.dest('docs'))
});


gulp.task('images', function(){
	return gulp.src('app/img/**/*')
	.pipe(cache(imagemin({
			optipng: [{optimizationLevel: 7}]
		})))
	.pipe(gulp.dest('docs/img'))
});


gulp.task('fonts', function() {
	return gulp.src('app/fonts/**/*')
		.pipe(gulp.dest('docs/fonts'))
});

gulp.task('clean:docs', function() {
	return del.sync('docs');
});

gulp.task('cache:clear', function (callback) {
	return cache.clearAll(callback);
});

gulp.task('build', function(callback) {
	runSequence('clean:docs',
		['sass', 'useref', 'images', 'fonts'],
		callback)
});

gulp.task('default', function(callback) {
	runSequence(['sass', 'browserSync', 'watch'], callback)
});