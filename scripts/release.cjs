const { execSync } = require('child_process');

// 解析参数
const args = process.argv.slice(2);
let versionType = 'patch';
let message = '';

for (let i = 0; i < args.length; i++) {
  const arg = args[i];
  if (arg === '-m' || arg === '--message') {
    message = args[++i] || '';
  } else if (['patch', 'minor', 'major'].includes(arg)) {
    versionType = arg;
  } else if (!arg.startsWith('-')) {
    message = arg;
  }
}

// 检查 npm 登录
console.log('检查 npm 登录状态...');
try {
  execSync('npm whoami', { stdio: 'ignore' });
} catch {
  console.error('未登录 npm，请先运行: npm login');
  process.exit(1);
}

// 检查工作区
try {
  const status = execSync('git status --porcelain', { encoding: 'utf-8' });
  if (status.trim()) {
    console.error('工作区有未提交的更改:\n', status);
    process.exit(1);
  }
} catch {
  console.error('无法检查 git 状态');
  process.exit(1);
}

// 设置环境变量
const env = { ...process.env, CHANGELOG_MSG: message };
console.log(`📦 发布 ${versionType} 版本...${message ? ` (changelog: ${message})` : ''}`);

// 发布流程
const steps = [
  { cmd: `npm version ${versionType} -m "chore(release): %s"`, msg: '更新版本号' },
  { cmd: 'npm publish --access public', msg: '发布到 npm', env: {} },
  { cmd: 'git push && git push --tags', msg: '推送到远程' }
];

for (const step of steps) {
  console.log(`  ${step.msg}...`);
  try {
    execSync(step.cmd, { stdio: 'inherit', env: step.env || env });
  } catch (error) {
    console.error(`❌ ${step.msg}失败`);
    process.exit(1);
  }
}

console.log('✅ 发布完成！');
