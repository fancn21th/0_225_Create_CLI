#!/usr/bin/env node
const path = require("path");
const copy = require("copy-template-dir");

const vars = {
  name: "foo",
  description: "foo cli",
  version: "0.0.1",
};

const inDir = path.join(__dirname, `template`);
const outDir = path.join(process.cwd(), `output`);

console.log({ inDir });

copy(inDir, outDir, vars, (err, createdFiles) => {
  if (err) throw err;
  createdFiles.forEach((filePath) => console.log(`Created ${filePath}`));
  console.log("done!");
});
