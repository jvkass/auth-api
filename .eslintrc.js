/**
 * eslint config
 * https://github.com/Sairyss/backend-best-practices#static-code-analysis
 */

module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint/eslint-plugin", "@typescript-eslint"],
  extends: [
    "airbnb-base",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "plugin:import/typescript",
    "prettier",
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  rules: {
    // TS off
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",

    // TS errors
    "@typescript-eslint/no-misused-new": "error",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-non-null-assertion": "off",

    // Eslint off
    "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
    "import/extensions": "off",
    "import/prefer-default-export": "off",
    "class-methods-use-this": "off",
    "no-useless-constructor": "off",
    "import/no-unresolved": "off",
    "no-control-regex": "off",
    "no-shadow": "off",
    "import/no-cycle": "off",
    "consistent-return": "off",
    "no-underscore-dangle": "off",
    "max-classes-per-file": "off",
    "eslint-disable camelcase": "off",
    "no-await-in-loop": "off",

    camelcase: [
      "error",
      {
        allow: ["access_token", "refresh_token", "user_id", "is_active"],
      },
    ],

    // Eslint errors
    "no-restricted-syntax": [
      "error",
      {
        selector: "LabeledStatement",
        message:
          "Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.",
      },
      {
        selector: "WithStatement",
        message:
          "`with` is disallowed in strict mode because it makes code impossible to predict and optimize.",
      },
      {
        selector: "MethodDefinition[kind='set']",
        message: "Property setters are not allowed",
      },
    ],
  },
};
