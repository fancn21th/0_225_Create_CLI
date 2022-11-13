const ask = require("./ask");

module.exports = async () => {
  // inputs
  const name = await ask({ message: `CLI name ?`, hint: `(kebab-case only)` });
  const command = await ask({
    message: `CLI command ?`,
    hint: `(optional: if different from CLI name given above)`,
    initial: name,
  });
  const description = await ask({
    message: `CLI description ?`,
  });
  const version = await ask({
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
