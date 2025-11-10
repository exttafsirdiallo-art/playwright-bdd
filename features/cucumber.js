// cucumber.js
module.exports = {
  default: [
    "--require-module ts-node/register", // permet de charger les .ts
    "--require features/**/*.ts", // charge steps + support (hooks, world)
    "--publish-quiet",
    "--format progress",
    "--fail-fast",
  ].join(" "),
};
