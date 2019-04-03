module.exports = {
  content: ['_site/**/*.html'],
  css: ['_site/assets/styles.css'],
  whitelistPatternsChildren: [/^flickity/],
  extractors: [
    {
      extractor: class {
        static extract(content) {
          return content.match(/[A-z0-9-:\/]+/g) || []
        }
      },
      extensions: ['html'],
    },
  ],
}
