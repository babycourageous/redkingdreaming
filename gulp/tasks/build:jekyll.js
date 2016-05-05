/**
 * Adapted from https://github.com/shakyShane/jekyll-gulp-sass-browser-sync
 *
 */
module.exports = function(gulp, plugins, config) {

	return function(done) {
		console.log('---> build:jekyll');

		var message = {
			jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
		};

		plugins.browsersync.notify(message.jekyllBuild);

		return plugins.cp.spawn('jekyll', ['build'], {stdio: 'inherit'})
	    .on('close', done);
	};

};
