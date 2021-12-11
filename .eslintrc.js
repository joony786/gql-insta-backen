module.exports = {
    parser: "@babel/eslint-parser",
    parserOptions: {
      sourceType: "module",
      allowImportExportEverywhere: false,
      ecmaFeatures: {
        globalReturn: false,
      },
      babelOptions: {
        configFile: "./babel.config.json",
      },
    },
  };
  