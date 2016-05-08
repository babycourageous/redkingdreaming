var config = {};

config.app    = ''; // The files Jekyll will work on
config.dist   = '_site/'; // The resulting static site
config.assets = '_assets/'; // The files Gulp will work on
config.nodedir = 'node_modules'; // npm directory for any external linked files

config.browsersync = {
  server: {
      baseDir: config.dist
  },
  // Don't show any notifications in the browser.
  notify: false
};

config.images = {
  src: config.assets + 'images/**/*',
  devdest: config.dist + 'assets/images',
  jekylldest: config.app + 'assets/images'
};

config.svg = {
  src: config.assets + 'svg/**/*',
  jekylldest: config.app + '_includes',
  options: {
    svg: {
      xmlDeclaration: false,
      doctypeDeclaration: false
    },

    mode: {
      inline: true,     // Prepare for inline embedding
      symbol: true      // Create a «symbol» sprite
    }
  }
};

config.scripts = {
  src: config.assets + 'scripts/**/*.js',
  devdest: config.dist + 'assets',
  jekylldest: config.app + 'assets',
};

config.styles = {
  src: config.assets + 'styles/styles.scss',
  devdest: config.dist + 'assets',
  jekylldest: config.app + 'assets',

  includePaths: [
    config.assets+'styles',
    config.nodedir + '/normalize.css',
    config.nodedir + '/bourbon/app/assets/stylesheets',
    config.nodedir +'/bourbon-neat/app/assets/stylesheets',
    config.nodedir+'/slick-carousel/slick',
  ],

	autoprefixer: {
    browsers: [
      'last 2 versions',
      'safari 5',
      'ie 8',
      'ie 9',
      'opera 12.1',
      'ios 6',
      'android 4'
    ],
    cascade: true
  },
};

module.exports = config;
