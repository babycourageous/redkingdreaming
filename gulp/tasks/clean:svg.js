module.exports = function(gulp, plugins, config) {
	return function() {
		console.log('---> clean:svg');
		return plugins.del(config.svg.jekylldest + '/symbol');
	};
};
