const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// 解析命令行参数
const args = process.argv.slice(2);

// 默认值
let versionType = 'patch';
let message = '';

// 解析参数
for (let i = 0; i < args.length; i++) {
  const arg = args[i];

  if (arg === '-m' || arg === '--message') {
    // 下一个参数是消息内容
    message = args[i + 1] || '';
    i++; // 跳过下一个参数
  } else if (arg === 'patch' || arg === 'minor' || arg === 'major') {
    versionType = arg;
  } else if (!arg.startsWith('-')) {
    // 如果不是以 - 开头，且不是已知类型，则视为消息
    message = arg;
  }
}

console.log(`📦 开始发布 ${versionType} 版本...`);

// 设置环境变量
const env = { ...process.env };
if (message) {
  env.CHANGELOG_MSG = message;
  console.log(`📝 Changelog: ${message}`);
} else {
  console.log('⚠️  未指定 changelog 内容，将创建"待更新"条目');
}

// 1. 更新版本号并生成 changelog（会自动触发 preversion 构建钩子）
console.log('🔢 正在更新版本号...');
try {
  execSync(`npm version ${versionType} -m "chore(release): %s"`, {
    stdio: 'inherit',
    env
  });
} catch (error) {
  console.error('❌ 版本更新失败');
  process.exit(1);
}

// 3. 发布到 npm
console.log('🚀 正在发布到 npm...');
try {
  execSync('npm publish --access public', { stdio: 'inherit' });
} catch (error) {
  console.error('❌ 发布失败');
  process.exit(1);
}

// 4. 推送到远程
console.log('📤 正在推送到远程仓库...');
try {
  execSync('git push && git push --tags', { stdio: 'inherit' });
} catch (error) {
  console.error('❌ 推送失败');
  process.exit(1);
}

console.log('✅ 发布完成！');
