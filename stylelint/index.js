module.exports = {
  extends: ["stylelint-config-standard", "stylelint-config-prettier"],
  ignoreFiles: [
    "./coverage/**/*",
    "./dist/**/*",
    "./node_modules/**/*",
    "./src/**/__snapshots__/**/*",
  ],
  rules: { "value-keyword-case": null },
};
