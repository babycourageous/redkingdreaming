module.exports = {
  plugins: [
    require("postcss-import"),
    require("precss"),
    require("tailwindcss")("./tailwind.config.js"),
    require("autoprefixer"),
    require("cssnano")
  ]
};
