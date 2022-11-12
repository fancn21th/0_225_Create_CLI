#!/usr/bin/env node
const path = require("path");
const copy = require("copy-template-dir");

const vars = {
  name: "foo",
  description: "foo cli",
  version: "0.0.1",
};

// helper
const log = console.log;

const inDir = path.join(__dirname, `template`);
const outDir = path.join(process.cwd(), `output`);

log(`\nCreate files in ./${outDir}`);

copy(inDir, outDir, vars, (err, createdFiles) => {
  if (err) throw err;
  createdFiles.forEach((filePath) => {
    const fileName = path.basename(filePath);
    log(`Created: ${fileName}`);
  });
  log("Done!\n");
});
