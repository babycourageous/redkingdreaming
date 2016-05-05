module.exports = function(gulp, plugins, config) {
	return function() {
		console.log('---> build:images');
		return gulp.src(config.images.src)
    .pipe(plugins.imagemin({
      progressive: true,
      use: [plugins.pngquant({
        quality: '65-75'
      })]
    }))
    .pipe(gulp.dest(config.images.jekylldest));
  }
};
