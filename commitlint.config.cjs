const conventionalCommit = require("./commit-rules.json");

const typesEnum = Object.keys(conventionalCommit.types);
const scopesEnum = Object.keys(conventionalCommit.scopes);

module.exports = {
  extends: ["@commitlint/config-conventional"],
  // extends but also override rules
  rules: {
    "type-enum": [2, "always", typesEnum],
    "scope-enum": [2, "always", scopesEnum],
    "scope-case": [2, "always", ["kebab-case"]],
    "subject-empty": [2, "never"],
    "subject-case": [2, "always", ["lower-case"]],
    "header-max-length": [2, "always", 72],
  },
};