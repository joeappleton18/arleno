const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
});

module.exports = withMDX({
  distDir: "../.next",
  pageExtensions: ["js", "jsx", "mdx"],
});
