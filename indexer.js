const fs = require("fs");
const pagesFolder = "./pages/";
const unified = require("unified");
const markdown = require("remark-parse");


var myRe = /.mdx$/;

const files = fs.readdirSync(pagesFolder);
let pages = [];

files.map((f) => {
  if (myRe.test(f)) {
    const data = fs.readFileSync(pagesFolder + f);
    const tokens = unified().use(markdown).parse(data);
    headings = tokens.children.filter((i) => i.type == "heading");
    pages.push({ headings, pageName: f });
  }
});

fs.writeFileSync("pages.json", JSON.stringify(pages));
