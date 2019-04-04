const marked = require("marked");

module.exports = function(eleventyConfig) {
  // Aliases are in relation to the _includes folder
  eleventyConfig.addLayoutAlias("default", "layouts/default.njk");

  eleventyConfig.addFilter("mdnop", function(value) {
    let result;
    try {
      result = marked(value).trim();
      result = result.replace(/^<p>|<\/p>$/g, "");
      return result;
    } catch (e) {
      console.error("Error processing markdown:", e);
      return value;
    }
  });

  eleventyConfig.addShortcode("texttohtml", function(text) {
    return `${text}`;
  });

  eleventyConfig.addPassthroughCopy("admin");

  // {{ array | where: key,value }}
  eleventyConfig.addFilter("where", function(array, key, value) {
    return array.filter(item => item.data[key] === value);
  });

  return {
    dir: {
      input: "./", // Equivalent to Jekyll's source property
      output: "./_site" // Equivalent to Jekyll's destination property
    },
    htmlTemplateEngine: "njk"
  };
};
