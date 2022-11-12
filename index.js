#!/usr/bin/env node
const { green: g, dim: d } = require("chalk");
const alert = require("cli-alerts");

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

  const inDirPath = path.join(__dirname, `template`);
  const outDirPath = path.join(process.cwd(), `output`);

  copy(inDirPath, outDirPath, vars, (err, createdFiles) => {
    if (err) throw err;

    log(d(`\nCreating Files in ${g(outDirPath)}`));

    createdFiles.forEach((filePath) => {
      const fileName = path.basename(filePath);
      log(`Created: ${fileName}`);
    });

    alert({
      type: "success",
      name: "DONE",
      msg: `\n\n${createdFiles.length} files created in ${d(
        outDirPath
      )} directory`,
    });
  });
})();
