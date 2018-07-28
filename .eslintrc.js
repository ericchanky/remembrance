module.exports = {
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true,
    "node": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:vue/recommended",
  ],
  "plugins": [
    "vue",
  ],
  "parserOptions": {
    "parser": "babel-eslint",
    "ecmaVersion": 2018,
    "sourceType": "module",
  },
  "rules": {
    "indent": ["error", 2],
    "linebreak-style": ["error", "unix"],
    "quotes": ["error", "single"],
    "semi": ["error", "never"],
    "comma-dangle": ["error", "always-multiline"],
    "object-property-newline": ["error", { "allowAllPropertiesOnSameLine": true }],
  }
};
