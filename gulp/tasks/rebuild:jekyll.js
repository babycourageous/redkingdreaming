/**
 * Adapted from https://github.com/shakyShane/jekyll-gulp-sass-browser-sync
 *
 * Wrapper function for a browsersync reload
 * Used for javascript and .html file changes
 */
module.exports = function(gulp, plugins, config) {

	return function() {
		console.log('---> rebuild:jekyll');
		plugins.browserSync.reload();
	}

};
