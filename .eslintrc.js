module.exports = {
  ignorePatterns: ['node_modules', 'dist', 'dist-main'],
  extends: [
    // add more generic rulesets here, such as:
    // 'eslint:recommended',
    // 'plugin:vue/vue3-recommended',
    'standard',
    'plugin:vue/recommended' // Use this if you are using Vue.js 2.x.
  ],
  overrides: [{
    files: ['*.js', '*.vue']
  }],
  rules: {
    // override/add rules settings here, such as:
    // 'vue/no-unused-vars': 'error'
    'vue/require-default-prop': 'off'
  }
}
