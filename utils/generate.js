const { green: g, dim: d } = require("chalk");
const path = require("path");
const copy = require("copy-template-dir");

const alert = require("cli-alerts");

const questions = require("./questions");

const log = console.log;

module.exports = async () => {
  const vars = await questions();

  const inDirPath = path.join(__dirname, `../template`);
  const outDirPath = path.join(process.cwd(), `output`);

  copy(inDirPath, outDirPath, vars, (err, createdFiles) => {
    if (err) throw err;

    log(g(`\nCreating Files in ${d(outDirPath)}\n`));

    createdFiles.forEach((filePath) => {
      const fileName = path.basename(filePath);
      log(`${g("CREATED:")} ${d(fileName)}`);
    });

    alert({
      type: "success",
      name: "DONE",
      msg: `\n\n${createdFiles.length} files created in ${d(
        outDirPath
      )} directory`,
    });
  });
};
