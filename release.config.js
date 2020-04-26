const getSemanticReleaseConfig = require("./semantic-release");

module.exports = getSemanticReleaseConfig("library", { withSlackbot: true });
