module.exports = {
  overrides: [
    {
      files: ['**/*.(scss|css|html|vue)'],
      customSyntax: 'postcss-scss',
    },
    {
      files: ['**/*.(html|vue)'],
      customSyntax: 'postcss-html',
    },
  ],
  extends: ['stylelint-config-standard'],
  rules: {
    'selector-class-pattern':
      '^(?:(?:o|c|u|t|s|is|has|_|js|qa)-)?[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*(?:__[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*)?(?:--[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*)?(?:\\[.+\\])?$',
    'rule-empty-line-before': 'never',
    'no-descending-specificity': null,
    'custom-property-empty-line-before': null,
    'declaration-empty-line-before': null,
    'color-function-notation': 'legacy',
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: ['v-deep'],
      },
    ],
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['deep', 'global', 'slotted'],
      },
    ],
    'function-no-unknown': null,
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['mixin', 'include', 'extend', 'use', 'forward', 'apply', 'for'],
      },
    ],
    'import-notation': 'string',
  },
};
