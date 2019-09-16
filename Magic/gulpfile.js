var gulp = require('gulp'),
	sass = require('gulp-sass'),
	browserSync = require('browser-sync'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	cssnano = require('gulp-cssnano'),
	rename = require('gulp-rename'),
	del = require('del'),
	imagemin = require('gulp-imagemin'),
	pngquant = require('imagemin-pngquant'),
	cache = require('gulp-cache'),
	autoprefixer = require('gulp-autoprefixer'),
	sourcemaps = require('gulp-sourcemaps'),
	imageminJpegRecompress = require('imagemin-jpeg-recompress');

gulp.task('default', ['watch']);

gulp.task('clear', function () {
	return cache.clearAll();
})

gulp.task('sass', function(){
	return gulp.src('app/sass/**/*.+(sass|scss)')
	.pipe(sass().on('error', sass.logError))
	.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.reload({stream: true}))
});

var jsfiles = [
	'app/libs/jquery/jquery-1.11.1.min.js',
	'app/libs/bootstrap/bootstrap.min.js',
	'app/libs/parallax/parallax.min.js',
	'app/libs/page-scroll2id/jquery.malihu.PageScroll2id.js',
	'app/libs/wow/wow.js',
	'app/libs/slick/slick.min.js',
	'app/libs/waypoints/waypoints-1.6.2.min.js'
];

gulp.task('scripts', function () {
	return gulp.src(jsfiles, {base: 'app/libs'})
		.pipe(concat('libs.min.js'))
		.pipe(gulp.dest('app/js'));
});

gulp.task('css-libs', ['sass'], function() {
	return gulp.src('app/css/libs.css')
	.pipe(cssnano())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('app/css'));
});

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false
	});
});

gulp.task('img', () => {
	gulp.src('app/img/**/*')
	.pipe(imagemin([
		imagemin.gifsicle({interlaced: true}),
		imagemin.jpegtran({progressive: true}),
		imageminJpegRecompress({progressive: true, min: 90, max: 95}),
		imagemin.svgo({plugins: [{removeViewBox: false}]}),
		imagemin.optipng({optimizationLevel: 3}),
		pngquant({quality: 90-95, speed: 4})
		], {
			verbose: true
		}))
	.pipe(gulp.dest('dist/img'));
});

gulp.task('watch', ['browser-sync', 'css-libs', 'scripts'], function() {
	gulp.watch('app/sass/**/*.sass', ['sass']);
	gulp.watch('app/**/*.html', browserSync.reload);
	gulp.watch('app/css/*.css', browserSync.reload);
	gulp.watch('app/js/**/*.js', browserSync.reload);
	gulp.watch('app/libs/**/*.js', browserSync.reload);
	gulp.watch('app/img/**/*.*', browserSync.reload);
});

gulp.task('clean', function() {
	return del.sync('dist');
});

gulp.task('clear', function() {
	return cache.clearAll();
});

gulp.task('build', ['clean', 'img', 'sass', 'scripts'], function() {
	var buildCss = gulp.src([
		'app/css/*',
		'!app/css/libs.css',
		'!app/css/animate.css'
		])
	.pipe(gulp.dest('dist/css'))

	var buildFonts = gulp.src('app/fonts/**/*')
	.pipe(gulp.dest('dist/fonts'))

	var buildJs = gulp.src('app/js/**/*')
	.pipe(gulp.dest('dist/js'))

	var buildHtml = gulp.src('app/**/*.html')
	.pipe(gulp.dest('dist'));
});