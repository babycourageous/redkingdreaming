module.exports = function(gulp, plugins, config) {
	return function() {
		console.log('---> clean:styles');
		return plugins.del([config.styles.jekylldest + 'styles.min.css']);
  };
};
