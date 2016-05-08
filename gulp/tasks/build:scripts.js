module.exports = function(gulp, plugins, config) {
	// https://github.com/gulpjs/gulp/blob/master/docs/recipes/browserify-uglify-sourcemap.md
	return function() {
		console.log('---> build:scripts');
		// set up the browserify instance on a task basis
		var b = plugins.browserify({
			entries: './_assets/scripts/main.js',
			debug: true
		});

		return b.bundle()
		  .pipe(plugins.stream('scripts.min.js'))
		  .pipe(plugins.buffer())
		  //.pipe(plugins.sourcemaps.init({loadMaps: true}))
		  // add transformation tasks to the pipeline here
		  .pipe(plugins.uglify())
		  //.pipe(plugins(sourcemaps.write('./')))
			.pipe(gulp.dest(config.scripts.jekylldest))
			.pipe(gulp.dest(config.scripts.devdest));
	}
};
