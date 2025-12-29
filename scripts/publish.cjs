const { execSync } = require('child_process');

// 解析参数
const args = process.argv.slice(2);
let otp = '';

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--otp') {
    otp = args[++i] || '';
  }
}

// 检查 npm 登录
console.log('检查 npm 登录状态...');
try {
  execSync('npm whoami', { stdio: 'ignore' });
} catch {
  console.error('❌ 未登录 npm，请先运行: npm login');
  process.exit(1);
}
console.log('✓ 已登录\n');

// 发布到 npm
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

  // 获取版本号
  const pkg = require('../package.json');
  console.log(`\n📦 包信息:`);
  console.log(`  名称: @ariel_jhy/ai-bot-adk`);
  console.log(`  版本: ${pkg.version}`);
  console.log(`  链接: https://www.npmjs.com/package/@ariel_jhy/ai-bot-adk\n`);
} catch (error) {
  console.error('\n❌ 发布失败');
  process.exit(1);
}
