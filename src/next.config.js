const indexer = require("./../indexer");
const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
});

indexer();

module.exports = withMDX({
  distDir: "../.next",
  pageExtensions: ["js", "jsx", "mdx"],
});
