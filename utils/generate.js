const execa = require("execa");
const ora = require("ora");
const { green: g, dim: d, yellow: y } = require("chalk");
const path = require("path");
const copy = require("copy-template-dir");

const alert = require("cli-alerts");

const spinner = ora({ text: `` });
const questions = require("./questions");

const log = console.log;

module.exports = async () => {
  const vars = await questions();

  const inDirPath = path.join(__dirname, `../template`);
  const outDirPath = path.join(process.cwd(), `output`);

  copy(inDirPath, outDirPath, vars, async (err, createdFiles) => {
    if (err) throw err;

    log(g(`\nCreating Files in ${d(outDirPath)}\n`));

    createdFiles.forEach((filePath) => {
      const fileName = path.basename(filePath);
      log(`${g("CREATED:")} ${d(fileName)}`);
    });

    // dedup
    spinner.start(`${y("DEDUP")} running...`);
    process.chdir(outDirPath);
    await execa("npm", ["dedup"]);
    spinner.succeed(`${g("DEDUP")} ran`);

    alert({
      type: "success",
      name: "DONE",
      msg: `\n\n${createdFiles.length} files created in ${d(
        outDirPath
      )} directory`,
    });
  });
};
