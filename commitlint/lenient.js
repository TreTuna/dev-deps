module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "scope-case": [1, "always", ["lower-case", "camel-case", "pascal-case"]],
    "subject-case": [0, "always", []],
    "subject-empty": [1, "never"],
    "subject-full-stop": [1, "never", "."],
    "type-empty": [1, "never"],
    "type-enum": [
      1,
      "always",
      [
        "build",
        "chore",
        "ci",
        "docs",
        "feat",
        "fix",
        "improvement",
        "perf",
        "refactor",
        "revert",
        "style",
        "test",
      ],
    ],
  },
};
