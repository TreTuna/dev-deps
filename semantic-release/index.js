module.exports = function buildSemanticReleaseConfig(
  configType,
  options = { withSlackbot: false, slackbotOptions: {}, customBranches: null }
) {
  const { withSlackbot, slackbotOptions, customBranches } = options;
  const appBranches = ["master"];
  const libraryBranches = [
    "master",
    { name: "develop", prerelease: "beta" },
    { name: "alpha", prerelease: true },
  ];

  function buildBranches() {
    if (customBranches) {
      return customBranches;
    }
    return configType === "library" ? libraryBranches : appBranches;
  }

  let plugins = [
    [
      "@semantic-release/commit-analyzer",
      {
        releaseRules: [
          {
            type: "refactor",
            release: "patch",
          },
          {
            type: "style",
            release: "patch",
          },
        ],
      },
    ],
    [
      "@semantic-release/release-notes-generator",
      {
        preset: "conventionalcommits",
        writerOpts: {
          types: [
            { type: "feat", section: "Features" },
            { type: "fix", section: "Bug Fixes" },
            {
              type: "perf",
              section: "Performance Improvements",
              hidden: false,
            },
            { type: "revert", section: "Reverts", hidden: false },
            { type: "docs", section: "Documentation", hidden: false },
            { type: "style", section: "Styles", hidden: false },
            { type: "chore", section: "Miscellaneous Chores", hidden: false },
            { type: "refactor", section: "Code Refactoring", hidden: false },
            { type: "test", section: "Tests", hidden: false },
            { type: "build", section: "Build System", hidden: false },
            { type: "ci", section: "Continuous Integration", hidden: false },
          ],
        },
      },
    ],
    "@semantic-release/changelog",
    "@semantic-release/github",
    [
      "@semantic-release/npm",
      {
        npmPublish: configType === "library" ? true : false,
      },
    ],
    "@semantic-release/git",
  ];

  const slackbot = [
    "semantic-release-slack-bot",
    {
      notifyOnSuccess: true,
      markdownReleaseNotes: true,
      ...slackbotOptions,
    },
  ];

  return {
    branches: buildBranches(),
    plugins: withSlackbot ? [...plugins, slackbot] : plugins,
  };
};
