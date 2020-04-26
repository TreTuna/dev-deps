# @TreTuna/prerolled-js

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
![Release](https://github.com/TreTuna/prerolled-js/workflows/Release/badge.svg)

A collection of shared libraries, tooling, and configurations commonly used for JavaScript application and library development.

---

## Table of contents

- [Installing in your project](#installing-in-your-project)

- [Linting and code formatting](#linting-and-code-formatting)

  - [Eslint](#eslint)
  - [Prettier](#prettier)
  - [Stylelint](#stylelint)
  - [Running linters](#running-linters)
    - [Scripts](#scripts)
    - [Lint-staged](#lint-staged)
    - [Integrating with Codeship](#integrating-with-codeship)

- [Git hooks with Husky](#git-hooks-with-husky)

- [Conventional commits](#conventional-commits)

  - [Commitizen](#commitizen)
  - [Commitlint](#commitlint)

- [Testing](#testing)

  - [Included libraries](#included-libraries)

- [Releasing/Publishing](#releasing/publishing)

  - [Semantic-release](#semantic-release)

- [Utility packages](#utility-packages)

- [Ignoring files/directories](#ignoring-files/directories)

---

## Installing in your project

```shell
yarn add --dev @TreTuna/dev-deps
```

---

## Linting and code formatting

### [ESLint](https://eslint.org/)

Create an `.eslintrc.js` file in the project root with the following:

#### For VanillaJS projects

```js
module.exports = {
  extends: ["@TreTuna/eslint-config"],
  rules: {
    // Your project-specific rules
  },
};
```

Note: This configuration extends `eslint:recommended` and `plugin:prettier/recommended`

#### For React projects

```js
module.exports = {
  extends: ["@TreTuna/eslint-config/react.js"],
  rules: {
    // Your project-specific rules
  },
};
```

---

To see what specific rules are in use, please check the respective files in `/eslint`.

### [Prettier](https://prettier.io/)

We are using all the defaults for `prettier` and do not need a configuration file for this tool.

---

### [Stylelint](https://github.com/stylelint/stylelint)

`stylelint` is for linting CSS. Create a `stylelint.config.js` file in the project root containing the following:

```js
module.exports = {
  extends: "@TreTuna/prerolled-js/stylelint",
};
```

---

### Running linters

#### Scripts

Add the following scripts to your `package.json`

```jsonc
{
  "scripts": {
    "fix:all": "run-s fix:js fix:css 'prettier --write'",
    "fix:css": "yarn lint:css --fix",
    "fix:js": "yarn lint:js --fix",
    "lint:all": "run-s lint:js lint:css 'prettier --list-different'",
    "lint:css": "stylelint --color --cache \"src/**/*.{js,css,html,scss}\"",
    "lint:js": "eslint --cache \"**/**.js\"",
    "prettier": "prettier --write \"**/*.+(js|jsx|json|yml|yaml|css|less|scss|ts|tsx|md|graphql|mdx)\""
  }
}
```

- Modify the paths for the directories your files are in.

---

#### [Lint-staged](https://github.com/okonet/lint-staged)

It's highly recommended to set up the linters and formatters to run on commit hooks.
This can be done by using `lint-staged` and `husky`.

```json
{
  "lint-staged": {
    "*.js": ["yarn fix:js"],
    "*.{js,jsx,json,yml,yaml,css,less,scss,ts,tsx,md,graphql,mdx}": [
      "yarn prettier"
    ],
    "*.{js,html,css,scss}": ["yarn fix:css"]
  },
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  }
}
```

---

#### Integrating with Codeship

In your `codeship-steps.yml` file, add a step that runs:

```shell
yarn install && yarn lint:all
```

This will not show success logs, but it will show failure logs.

## Git hooks with Husky

This library installs [Husky](https://github.com/typicode/husky) for needs around git hooks and is configured in your `package.json` file. You can use the one in this repo as an example. Husky supports all Git hooks listed [here](https://git-scm.com/docs/githooks).

---

## [Conventional Commits](https://www.conventionalcommits.org/)

We have adopted the [Conventional Commits](https://www.conventionalcommits.org/) methodology for our commit messages. To make this easier for devs to use, we added a commitizen setup.

Commit messages should be in the following format:

```md
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### [Commitizen](http://commitizen.github.io/cz-cli/)

Commitizen is a tool that helps you stay to this. It is a replacement for the `git commit` command. To use it follow the steps:

- Inside `package.json` add:

  ```json
  {
    "scripts": {
      "cz": "git-cz"
    },
    "config": {
      "commitizen": {
        "path": "./node_modules/cz-conventional-changelog"
      }
    }
  }
  ```

- Run `yarn cz` and follow the prompt.

#### `Select the type of change that you're committing:`

The follow are all the action `types`:

```text
feat:     A new feature
fix:      A bug fix
docs:     Documentation only changes
style:    Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
refactor: A code change that neither fixes a bug nor adds a feature
perf:     A code change that improves performance
test:     Adding missing tests or correcting existing tests
build:    Changes that affect the build system or external dependencies (example scopes: webpack, rollup, github-package)
ci:       Changes to our CI configuration files and scripts (example scopes: codeship, github-actions)
chore:    Other changes that don't modify src or test files
revert:   Reverts a previous commit
```

#### `What is the scope of this change (e.g. component or file name): (press enter to skip)`

This is where you can scope the change down. You can skip this section, but it can help a lot to the reader about what was worked on. Examples are:

- component name (`StrainReview`)
- library name (`@TreTuna/prerolled-js`)
- file name (`eslint/react.js`)
- feature (`sync-action`)

#### `Write a short, imperative tense description of the change (max XX chars):`

This is your space for a concise description of the change. It will tell you how many characters you have to use. The allowed length is effected by the length of the `type` and `scope` strings. This is generally looked to as the `what was changed?` part of a commit message.

#### `Provide a longer description of the change: (press enter to skip)`

This is where you can write more about `why` the change was made if you need more space.

#### `Are there any breaking changes? (y/N)`

If your changes break existing functionality, report it here. If you mark the commit as a `BREAKING_CHANGE` you will be prompted for a description of the change.

#### `Does this change affect any open issues? (y/N)`

Here you can answer if there is a ticket (Jira) associated with this change. If you say yes, you will be prompted for the ticket reference. This is generally where you would enter the Jira ticket reference number (example: LT-420).

### [Commitlint](https://commitlint.js.org/)

This is a linter that pairs with commitizen to ensure commits are held to the proper format. It will fail any commit where the message does not follow the standards.

Add a `commitlint.config.js` file to your repo with:

#### Strict rules

This will fail commits that do not meet the standard.

```js
module.exports = {
  extends: ["@TreTuna/prerolled-js/commitlint"],
};
```

Note: if you are using `semantic-release` you _must_ use the strict version of this configuration to ensure proper commit messages for `semantic-release` to be able to parse.

#### Lenient rules

Only use these if your team is just getting started with Conventional Commits. This configuration will give more warnings than errors and could let through some message that are not fully compliant to the Conventional Commit standard.

```js
module.exports = {
  extends: ["@TreTuna/prerolled-js/commitlint/lenient.js"],
};
```

---

## Testing

### Included libraries

- [jest](https://jestjs.io/)
- jest-axe
- expect
- identity-obj-proxy
- codecov
- [@testing-library/dom](https://testing-library.com/docs/dom-testing-library/intro)
- [@testing-library/jest-dom](https://testing-library.com/docs/ecosystem-jest-dom)
- [@testing-library/react](https://testing-library.com/docs/react-testing-library/intro)
- [@testing-library/react-hooks](https://react-hooks-testing-library.com/)
- [@testing-library/user-event](https://testing-library.com/docs/ecosystem-user-event)

---

## Releasing/Publishing

### [Semantic-release](https://semantic-release.gitbook.io/semantic-release/)

TODO

---

## Utility packages

### npm-run-all

TODO

---

## Ignoring files/directories

You will find examples you can use for your repo's ignore files in this repo:

- `.gitignore`
- `.eslintignore`
- `.prettierignore`
- `.stylelintignore`
