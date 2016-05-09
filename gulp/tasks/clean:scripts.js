module.exports = function(gulp, plugins, config) {
	return function() {
		console.log('---> clean:scripts');
		return plugins.del([config.scripts.jekylldest + 'main.min.js', config.scripts.devdest + 'main.min.js']);
  };
};
