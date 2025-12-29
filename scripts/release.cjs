const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// 解析参数
const args = process.argv.slice(2);
let otp = '';
let message = '';

for (let i = 0; i < args.length; i++) {
  const arg = args[i];
  if (arg === '--otp') {
    otp = args[++i] || '';
  } else if (arg === '-m' || arg === '--message') {
    message = args[++i] || '';
  } else if (!arg.startsWith('-')) {
    message = arg;
  }
}

// 获取当前版本
const pkgPath = path.resolve(__dirname, '../package.json');
const version = JSON.parse(fs.readFileSync(pkgPath, 'utf-8')).version;

console.log(`\n📦 发布版本 ${version}...\n`);

// 1. 检查工作区
console.log('检查工作区状态...');
const status = execSync('git status --porcelain', { encoding: 'utf-8' });
if (status.trim()) {
  console.error('❌ 工作区有未提交的更改:\n', status);
  console.log('\n请先提交更改或使用 stash');
  process.exit(1);
}
console.log('✓ 工作区干净\n');

// 2. 检查 npm 登录
console.log('检查 npm 登录状态...');
try {
  execSync('npm whoami', { stdio: 'ignore' });
} catch {
  console.error('❌ 未登录 npm，请先运行: npm login');
  process.exit(1);
}
console.log('✓ 已登录\n');

// 3. 发布到 npm
console.log('发布到 npm...');

try {
  execSync(`npm publish --access public`, {
    stdio: 'inherit'
  });
  console.log('\n✓ npm 发布成功\n');
} catch (error) {
  console.error('\n❌ npm 发布失败，终止流程');
  process.exit(1);
}

// 4. 更新 CHANGELOG.md
console.log('更新 CHANGELOG.md...');
if (message) {
  console.log(`  变更内容: ${message}`);
} else {
  console.log('  ⚠️  未指定变更内容，将创建"待更新"条目');
  console.log('  使用 -m "内容" 参数指定变更');
}

try {
  // 设置环境变量并执行更新脚本
  const env = { ...process.env, CHANGELOG_MSG: message };
  execSync('node scripts/update-changelog.cjs', {
    stdio: 'inherit',
    env
  });

  // 提交 CHANGELOG.md
  execSync('git add CHANGELOG.md', { stdio: 'inherit' });
  execSync(`git commit -m "docs: 更新 CHANGELOG to ${version}"`, { stdio: 'inherit' });
  console.log('✓ CHANGELOG.md 已更新并提交\n');
} catch (error) {
  console.error('❌ 更新 CHANGELOG.md 失败');
  process.exit(1);
}

// 5. 创建 tag
console.log(`创建 tag v${version}...`);
const tagMsg = message ? `Release v${version}\n\n${message}` : `Release v${version}`;
execSync(`git tag -a v${version} -m "${tagMsg}"`, { stdio: 'inherit' });
console.log('✓ Tag 创建成功\n');

// 6. 推送提交和 tag
console.log('推送到远程...');
execSync(`git push && git push origin v${version}`, { stdio: 'inherit' });
console.log('✓ 推送成功\n');

console.log(`\n✅ 版本 ${version} 发布完成！`);
console.log(`\n📦 包信息:`);
console.log(`  名称: @ariel_jhy/ai-bot-adk`);
console.log(`  版本: ${version}`);
console.log(`  链接: https://www.npmjs.com/package/@ariel_jhy/ai-bot-adk\n`);
