const indexer = require("./../indexer");
const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
});

const withImages = require('next-images')

indexer();

module.exports = withImages(withMDX({
  distDir: "../.next",
  pageExtensions: ["js", "jsx", "mdx"],
}));
