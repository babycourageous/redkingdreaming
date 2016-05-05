module.exports = function(gulp, plugins, config) {
	return function() {
		console.log('---> browsersync');
		plugins.browsersync.init(config.browsersync);
	};
};
