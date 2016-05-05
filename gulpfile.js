/* GULP PLUGINS
********** */
var gulp    = require('gulp');
var plugins = require('gulp-load-plugins')();

/* UTILITIES
********** */
plugins.autoprefixer = require('autoprefixer');
plugins.browserify   = require('browserify');
plugins.buffer       = require('vinyl-buffer');
plugins.stream       = require('vinyl-source-stream');
plugins.browsersync  = require('browser-sync').create();
plugins.del          = require('del');
plugins.pngquant     = require('imagemin-pngquant');
plugins.runsequence  = require('run-sequence');
plugins.cp           = require('child_process');

/* CONFIGURATION
********** */
var config           = require('./gulp/config.js');

function getTask(task) {
   return require('./gulp/tasks/' + task)(gulp, plugins, config);
}

/**
 *  Main Task Imports
 */
gulp.task('build:styles', getTask('build:styles'));
gulp.task('build:scripts', getTask('build:scripts'));
gulp.task('build:images', getTask('build:images'));
gulp.task('build:svg', getTask('build:svg'));
gulp.task('build:jekyll', getTask('build:jekyll'));
gulp.task('rebuild:jekyll', getTask('rebuild:jekyll'));

/**
 *  Clean Task Imports
 */
gulp.task('clean:styles', getTask('clean:styles'));
gulp.task('clean:scripts', getTask('clean:scripts'));
gulp.task('clean:images', getTask('clean:images'));
gulp.task('clean:svg', getTask('clean:svg'));
gulp.task('clean:jekyll', getTask('clean:jekyll'));

/**
 * Batch Clean Task
 */
gulp.task('clean', ['clean:styles', 'clean:images', 'clean:svg', 'clean:scripts', 'clean:jekyll']);

/**
 * Batch Build Task
 * 1. clean out files
 * 2. build assets in parallel
 * 3. build jekyll
 */
gulp.task('build', function(cb) {
	plugins.runsequence('clean',
	    ['build:images', 'build:scripts', 'build:styles', 'build:svg'],
      'build:jekyll',
      cb);
});
/**
 * Wrapper Build:Scripts:Serve Task
 * 1. Build Script Files
 * 2. Reload Browser
 */
gulp.task('build:scripts:serve', ['build:scripts'], function(cb) {
	plugins.browsersync.reload();
	cb();
});
/**
 * Wrapper Build:Jekyll:Serve Task
 * 1. Build Jekyll Files
 * 2. Reload Browser
 */
gulp.task('build:jekyll:serve', ['build:jekyll'], function(cb) {
	plugins.browsersync.reload();
	cb();
});

/**
 * Batch Serve Task
 */
gulp.task('serve', ['build'], function() {
	// INIT browsersync
	getTask('browsersync')(gulp, plugins, config);
	// WATCH config.yml --> build:jekyll:serve
	gulp.watch(['_config.yml'], ['build:jekyll:serve']);
	// WATCH sass|scss --> styles
	gulp.watch('app/_assets/styles/**/*.+(sass|scss)', ['build:styles']);
	// WATCH js --> build:scripts:serve
	gulp.watch('app/_assets/scripts/**/*.js', ['build:scripts:serve']);
	// WATCH images --> build:images
	gulp.watch('app/_assets/images/**/*.+(jpg|png|jpeg|gif)', ['build:images']);
	// WATCH svg --> build:svg
	gulp.watch('app/_assets/svg/**/*.svg', ['build:svg']);
	// WATCH _posts --> build:jekyll:serve
	gulp.watch('_posts/**/*.+(md|markdown|MD)', ['build:jekyll:serve']);
	// WATCH html --> build:jekyll:serve
	// -- **/*.html, !_site/**/*/*.*
	gulp.watch(['**/*.html', '!dist/**/*.*'], ['build:jekyll:serve']);
	// WATCH rss feed --> build:jekyll:serve
	gulp.watch('feed.xml', ['build:jekyll:serve']);
	// WATCH _data --> build:jekyll:serve
	gulp.watch('app/_data/*.+(yml|yaml|csv|json)', ['build:jekyll:serve']);
	// WATCH favicon --> build:jekyll:serve
	gulp.watch('favicon.ico', ['build:jekyll:serve']);
});


gulp.task('default', function() {
	console.log('gulp default task');
})