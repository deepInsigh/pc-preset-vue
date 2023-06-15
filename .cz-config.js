module.exports = {
  types: [
    { value: 'feat', name: '✨  feat:     新增功能' },
    { value: 'fix', name: '🐛  fix:      修复 bug' },
    {
      value: 'style',
      name: '💅  style:    代码格式（不影响功能，例如空格、分号等格式修正）',
    },
    {
      value: 'refactor',
      name: '🛠   refactor: 代码重构（不包括 bug 修复、功能新增）',
    },
    { value: 'perf', name: '📈  perf:     性能优化' },
    { value: 'test', name: '🏁  test:     添加、修改测试用例' },
    {
      value: 'build',
      name: '🗯   build:    构建流程、外部依赖变更（如升级 npm 包、修改 webpack 配置等）',
    },
    { value: 'ci', name: '🔧  ci:       修改 CI 配置、脚本' },
    { value: 'revert', name: '⏪  revert:   回滚 commit' },
  ],
  scopes: [
    ['components', '组件相关'],
    ['utils', 'utils 相关'],
    ['styles', '样式相关'],
    ['deps', '项目依赖'],
    ['other', '其他修改'],
    ['custom', '以上都不是？我要自定义'],
  ].map(([value, description]) => {
    return {
      value,
      name: `${value.padEnd(30)} (${description})`,
    };
  }),
  messages: {
    type: '确保本次提交遵循规范!选择你要提交的类型:\n',
    scope: '选择一个 scope (可选):\n',
    customScope: '请输入自定义的 scope:\n',
    subject: '填写简短精炼的变更描述:\n',
    body: '填写更加详细的变更描述（可选）使用 "|" 换行:\n',
    breaking: '列举非兼容性重大的变更（可选):\n',
    footer: '列举出所有变更的 ISSUES CLOSED (可选) 例如: #31, #34:\n',
    confirmCommit: '确认提交?',
  },
  allowBreakingChanges: ['feat', 'fix'],
  skipQuestions: ['body', 'footer', 'breaking'],
  subjectLimit: 100,
  breaklineChar: '|',
};
