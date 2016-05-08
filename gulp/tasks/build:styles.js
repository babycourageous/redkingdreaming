module.exports = function(gulp, plugins, config) {
	return function() {
		console.log('---> build:styles');
		/**
		 * gulp-notify error handler
		 */
	  var onError = function(err) {
	  	console.log(err);
	  	plugins.notify.onError("Error: <%= err.message %>");
	  	this.emit('end');
	  }

	  return gulp.src(config.styles.src)
		// error handling (with gulp-notify)
	  .pipe(plugins.plumber({ errorHandler: onError }))
	  // Process the original sources
	  .pipe(plugins.sourcemaps.init())
	  // Minify with plugin
	  // sass outputStyle: 'compressed' breaks sourcemaps
		.pipe(plugins.sass({
			includePaths: config.styles.includePaths
		}))
		// postcss & autoprefixer
	  .pipe(plugins.postcss([
	    plugins.autoprefixer(config.styles.autoprefixer)
	  ]))
		.pipe(plugins.cssnano())
	  .pipe(plugins.rename({ extname: '.min.css' }))
		// Add the map to modified source.
	  .pipe(plugins.sourcemaps.write())
	  // save to jekyll destination directory
	  .pipe(gulp.dest(config.styles.jekylldest))
		// save to jekyll _site directory (for development)
		.pipe(gulp.dest(config.styles.devdest))
	  // inject CSS into browser via browsersync
	  .pipe(plugins.browsersync.stream());
	};

};
