module.exports = function(gulp, plugins, config) {
	return function() {
		console.log('---> clean:images');
		return plugins.del(config.images.jekylldest);
	};
};
