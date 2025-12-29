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

// 2. 检查 tag 是否已存在
try {
  const tags = execSync(`git tag -l "v${version}"`, { encoding: 'utf-8' });
  if (tags.trim()) {
    console.error(`❌ Tag v${version} 已存在`);
    console.log('\n如需重新发布，请先删除现有 tag:');
    console.log(`  git tag -d v${version} && git push origin :refs/tags/v${version}`);
    process.exit(1);
  }
} catch {}

// 3. 创建 tag
console.log(`创建 tag v${version}...`);
const commitMsg = message ? `chore(release): ${version}\n\n${message}` : `chore(release): ${version}`;
execSync(`git tag -a v${version} -m "${commitMsg}"`, { stdio: 'inherit' });
console.log('✓ Tag 创建成功\n');

// 4. 推送 tag
console.log('推送 tag 到远程...');
execSync(`git push origin v${version}`, { stdio: 'inherit' });
console.log('✓ Tag 推送成功\n');

// 5. 发布到 npm
console.log('发布到 npm...');
if (!otp) {
  console.log('⚠️  未提供 OTP，如果需要两步验证会失败');
  console.log('   使用 --otp=验证码 参数\n');
}

try {
  execSync(`npm publish --access public${otp ? ' --otp=' + otp : ''}`, {
    stdio: 'inherit'
  });
  console.log('\n✅ 发布成功！');
} catch (error) {
  console.error('\n❌ npm 发布失败');
  console.log('\n如需删除 tag，请执行:');
  console.log(`  git tag -d v${version} && git push origin :refs/tags/v${version}`);
  process.exit(1);
}

console.log(`\n✅ 版本 ${version} 发布完成！`);
console.log(`\n📦 包信息:`);
console.log(`  名称: @ariel_jhy/ai-bot-adk`);
console.log(`  版本: ${version}`);
console.log(`  链接: https://www.npmjs.com/package/@ariel_jhy/ai-bot-adk\n`);
