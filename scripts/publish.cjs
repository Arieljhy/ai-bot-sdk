const { execSync } = require('child_process');

// 解析参数
const args = process.argv.slice(2);
let otp = '';
let pushGit = true;

for (let i = 0; i < args.length; i++) {
  const arg = args[i];
  if (arg === '--otp') {
    otp = args[++i] || '';
  } else if (arg === '--no-push') {
    pushGit = false;
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

// 发布到 npm
console.log('🚀 发布到 npm...');
if (!otp) {
  console.log('⚠️  未提供 OTP，如果需要两步验证会失败');
  console.log('   使用方法: node scripts/publish.cjs --otp=验证码');
}

try {
  execSync(`npm publish --access public${otp ? ' --otp=' + otp : ''}`, {
    stdio: 'inherit'
  });
} catch (error) {
  console.error('❌ 发布失败');
  process.exit(1);
}

console.log('✅ 发布成功！');

// 推送到 git
if (pushGit) {
  console.log('📤 推送到远程仓库...');
  try {
    execSync('git push && git push --tags', { stdio: 'inherit' });
  } catch (error) {
    console.error('❌ 推送失败');
    process.exit(1);
  }
  console.log('✅ 推送完成！');
} else {
  console.log('⚠️  跳过 git push，请手动推送: git push && git push --tags');
}

console.log('\n✅ 所有操作完成！');
