#!/usr/bin/env node
const path = require("path");
const copy = require("copy-template-dir");
const { Input } = require("enquirer");
const to = require("await-to-js").default;
const handleError = require("cli-handle-error");

const init = require("./utils/init");

const log = console.log;

(async () => {
  init();

  const [err, name] = await to(
    new Input({
      message: `CLI name?`,
      hint: `(use kebab-case only)`,
    }).run()
  );

  handleError(`INPUT`, err);

  const vars = {
    name,
    description: `CLI to foo`,
    version: `0.0.1`,
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
