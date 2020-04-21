module.exports = {
  env: {
    "react-native/react-native": true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
  },
  plugins: [
    "@typescript-eslint",
  ],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:react/recommended",
    "plugin:react-native/all",
    "plugin:react-native-a11y/android",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended",
    "prettier/@typescript-eslint",
    "prettier/react",
  ],
  settings: {
    react: {
      version: "detect",
    },
    "import/resolver": {
      node: {
        extensions: [
          ".ts",
          ".tsx",
          ".android.tsx",
          "ios.tsx",
          ".android.ts",
          "ios.ts",
        ],
      },
    },
    "import/extensions": [
      ".ts",
      ".tsx",
      ".android.tsx",
      "ios.tsx",
      ".android.ts",
      "ios.ts",
    ],
  },
  rules: {
    "global-require": "off",
    "react/prop-types": "off",
    "@typescript-eslint/no-use-before-define": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "react/self-closing-comp": "error",
    "import/order": "error",
    "react-native/no-raw-text": "off",
    "prettier/prettier": [
      "error",
      {
        singleQuote: true,
        trailingComma: "all",
        jsxBracketSameLine: true,
        printWidth: 80,
        tabWidth: 2,
        useTabs: false,
        semi: true,
        allowParens: "always",
      },
    ],
  },
};
