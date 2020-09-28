const fs = require("fs");
const unified = require("unified");
const markdown = require("remark-parse");
const menu = require("./src/config/menu");
const pagesFolder = "./src/pages/";

const indexer = () => {
  let pages = [];
  menu.forEach((i) => {
    const data = fs.readFileSync(pagesFolder + i.page);
    const tokens = unified().use(markdown).parse(data);
    headings = tokens.children.filter((i) => i.type == "heading");
    pages.push({ headings, pageName: i.page });
    headings = tokens.children.filter((i) => i.type == "heading");
  });

  fs.writeFileSync("pages.json", JSON.stringify(pages));
};

module.exports = indexer;
