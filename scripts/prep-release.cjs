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

// 检查工作区
try {
  const status = execSync('git status --porcelain', { encoding: 'utf-8' });
  if (status.trim()) {
    console.error('❌ 工作区有未提交的更改:\n', status);
    process.exit(1);
  }
} catch {
  console.error('❌ 无法检查 git 状态');
  process.exit(1);
}

// 设置环境变量
const env = { ...process.env, CHANGELOG_MSG: message };
console.log(`📦 准备发布 ${versionType} 版本...${message ? ` (changelog: ${message})` : ''}\n`);

// 更新版本号（不创建 git tag，由 release 脚本统一创建）
console.log('更新版本号并构建...');
try {
  execSync(`npm version ${versionType} --no-git-tag-version`, {
    stdio: 'inherit',
    env
  });
} catch (error) {
  console.error('❌ 版本更新失败');
  process.exit(1);
}

// 提交版本变更
console.log('提交版本变更...');
try {
  execSync('git add package.json', { stdio: 'inherit' });
  execSync(`git commit -m "chore(release): bump version to ${require('../package.json').version}"`, {
    stdio: 'inherit'
  });
} catch (error) {
  console.error('❌ 提交版本变更失败');
  process.exit(1);
}

console.log('\n✅ 版本准备完成！');
console.log('\n下一步，执行发布命令:');
console.log('npm login \n');
console.log('npm run release \n');
