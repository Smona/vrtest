// grab gulp files
var gulp = require('gulp');
var gutil = require('gulp-util');
var gulpif = require('gulp-if');
var concat = require('gulp-concat');
var pleeease = require('gulp-pleeease');
var sass = require('gulp-sass');
// var imageOptim = require('gulp-imageoptim');
// var imageMin = require('gulp-imagemin');
// var htmlMin = require('gulp-html-minifier');
// var uglify = require('gulp-uglify');
// var srcmap = require('gulp-sourcemaps');

// create a default task and just log a message
gulp.task('default', ['watch'], function () {
	return gutil.log('Gulp is running!');
});

// gulp.task('html', function () {
// 	gulp.src(['src/*.html'])
// 	.pipe(htmlMin({collapseWhitespace: true}))
// 	.pipe(gulp.dest('./build'));
// });

gulp.task('css', function () {
	gulp.src(['./SCAPI/css/*.*css', '!./SCAPI/css/out.min.css'])
	.pipe(gulpif(/\.scss/, sass().on('error', sass.logError)))
	.pipe(concat('all.css'))
    .pipe(pleeease({
	mqpacker: true,
	minifier: {removeAllComments: true},
	out: 'out.min.css'
    }))
    .pipe(gulp.dest('./SCAPI/css'));
});
// gulp.task('js', function () {
// 	gulp.src(['src/js/*.js'])
// 	.pipe(srcmap.init())
// 		.pipe(concat('all.js'))
// 		.pipe(uglify())
// 	.pipe(srcmap.write('.'))
// 	.pipe(gulp.dest('./build/js'));
// 	gulp.src(['node_modules/respond.js/dest/respond.min.js', '/Users/Mason/MEGAsync/Computer Development/Kiwanis Sales Page/node_modules/rem-unit-polyfill/js/rem.min.js'])
// 	.pipe(srcmap.init())
// 		.pipe(concat('polyfills.js'))
// 		.pipe(uglify())
// 	.pipe(srcmap.write('./'))
// 	.pipe(gulp.dest('build/js'));
// });
// gulp.task('images', function () {
// 	gulp.src(['src/images/*.png', 'src/images/*.jpeg', 'src/images/*.gif'])
// 	.pipe(imageMin())
// 	.pipe(imageOptim.optimize())
// 	.pipe(gulp.dest('build/images'));
// });

// Automation
gulp.task('watch', function () {
	// gulp.watch('./src/*.html', ['html']);
	// gulp.watch('./src/js/*.js', ['js']);
	gulp.watch('./SCAPI/css/*', ['css']);
	// gulp.watch(['./src/images/*.png', './src/images/*.jpeg', 'src/images/*.gif'], ['images']);
});
