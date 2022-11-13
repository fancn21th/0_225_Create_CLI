const alert = require("cli-alerts");
const log = console.log;

module.exports = (info) => {
  alert({
    type: `warning`,
    name: `DEBUG LOG`,
    msg: ``,
  });

  log(info);
  log();
};
