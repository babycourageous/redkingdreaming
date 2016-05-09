module.exports = function(gulp, plugins, config) {
	return function() {
		console.log('---> clean:scripts');
		return plugins.del([config.scripts.jekylldest + '/scripts.min.js', config.scripts.devdest + '/scripts.min.js']);
  };
};
