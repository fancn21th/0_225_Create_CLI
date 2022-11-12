#!/usr/bin/env node
const path = require("path");
const copy = require("copy-template-dir");

const init = require("./utils/init");
const ask = require("./utils/ask");

const log = console.log;

(async () => {
  init();

  const name = await ask({ message: `CLI name ?`, hint: `(kebab-case only)` });
  const description = await ask({
    message: `CLI description ?`,
  });
  const version = await ask({
    message: `CLI version ?`,
    initial: `0.0.1`,
  });

  const vars = {
    name,
    description,
    version,
  };

  const inDir = path.join(__dirname, `template`);
  const outDir = path.join(process.cwd(), `output`);

  log(`\nCreating Files in ${outDir}`);

  copy(inDir, outDir, vars, (err, createFiles) => {
    if (err) throw err;
    createFiles.forEach((filePath) => {
      const fileName = path.basename(filePath);
      log(`Created: ${fileName}`);
    });
    log("Done!\n");
  });
})();
