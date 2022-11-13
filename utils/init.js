const welcome = require("cli-welcome");
const pkg = require("./../package.json");
const unhandled = require("cli-handle-unhandled");

module.exports = ({ clear }) => {
  unhandled();

  welcome({
    title: "fcli",
    tagLine: "by fancn21th",
    description: pkg.description,
    version: pkg.version,
    bgColor: "#6cc24a",
    color: "#000000",
    clear,
    bold: true,
  });
};
