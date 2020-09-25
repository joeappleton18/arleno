const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
});

module.exports = {
  distDir: "../.next",
  pageExtensions: ["js", "jsx", "mdx"],
};
