const ask = require("./ask");

module.exports = async () => {
  // inputs
  const name = await ask({
    name: "name",
    message: `CLI name ?`,
    hint: `(kebab-case only)`,
  });
  const command = await ask({
    name: "command",
    message: `CLI command ?`,
    hint: `(optional: if different from CLI name given above)`,
    initial: name,
  });
  const description = await ask({
    name: "description",
    message: `CLI description ?`,
  });
  const version = await ask({
    name: "version",
    message: `CLI version ?`,
    initial: `0.0.1`,
  });

  // vars
  const vars = {
    name,
    description,
    version,
    command,
  };

  return vars;
};
