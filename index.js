#!/usr/bin/env node

const init = require("./utils/init");
const cli = require("./utils/cli");
const generate = require("./utils/generate");

const log = require("./utils/log");

const input = cli.input;
const flags = cli.flags;
const { clear, debug } = flags;

(async () => {
  init({ clear });

  //  help
  input.includes("help") && cli.showHelp(0);

  // debug
  debug && log(flags);

  // generate
  await generate();
})();
