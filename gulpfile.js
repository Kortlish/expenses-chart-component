const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const terser = require('gulp-terser');
const browsersync = require('browser-sync').create();

// sass task
function sassTask() {
	return src('./sass/**/*.scss', { sourcemaps: true })
		.pipe(sass())
		.pipe(postcss([cssnano()]))
		.pipe(dest('dist', { sourcemaps: '.' }));
}

// js task

function jsTask() {
	return src('./js/**/*.js', { sourcemaps: true })
		.pipe(terser())
		.pipe(dest('dist', { sourcemaps: '.' }));
}

// browsersync task

function browsersyncServe(cb) {
	browsersync.init({
		server: {
			baseDir: '.',
		},
	});
	cb();
}

function browsersyncReload(cb) {
	browsersync.reload();
	cb();
}

// Watch task
function watchTask() {
	watch('*.html', browsersyncReload);
	watch(
		['./sass/**/*.scss', './js/**/*.js'],
		series(sassTask, jsTask, browsersyncReload)
	);
}

// Default Gulp task
exports.default = series(sassTask, jsTask, browsersyncServe, watchTask);
