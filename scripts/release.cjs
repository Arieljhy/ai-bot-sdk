const { execSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

// 创建 readline 接口用于交互式输入
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// 解析参数
const args = process.argv.slice(2);
let message = '';

for (let i = 0; i < args.length; i++) {
  const arg = args[i];
  if (arg === '-m' || arg === '--message') {
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
  rl.close();
  process.exit(1);
}
console.log('✓ 工作区干净\n');

// 2. 检查 npm 登录
console.log('检查 npm 登录状态...');
try {
  execSync('npm whoami', { stdio: 'ignore' });
} catch {
  console.error('❌ 未登录 npm，请先运行: npm login');
  rl.close();
  process.exit(1);
}
console.log('✓ 已登录\n');

// 3. 发布到 npm（支持 WebAuth 浏览器认证和 OTP）
const publishWithRetry = async () => {
  let retries = 0;
  const maxRetries = 3;

  while (retries < maxRetries) {
    try {
      console.log('尝试发布到 npm...');

      // 使用 spawn 来处理交互式输出
      const npmPublish = spawn('npm', ['publish', '--access', 'public'], {
        stdio: ['pipe', 'pipe', 'inherit']
      });

      // 监听 stdout
      npmPublish.stdout.on('data', (data) => {
        const output = data.toString();
        process.stdout.write(output);

        // 检测 WebAuth 认证链接
        const authMatch = output.match(/https:\/\/www\.npmjs\.com\/auth\/cli\/[a-f0-9-]+/);
        if (authMatch) {
          console.log('\n🔐 检测到浏览器认证链接');
        }

        // 检测是否需要按回车打开浏览器
        if (output.includes('Press ENTER to open in the browser')) {
          console.log('正在打开浏览器...');

          // 自动按回车打开浏览器
          npmPublish.stdin.write('\n');
        }
      });

      // 等待进程结束
      const exitCode = await new Promise((resolve) => {
        npmPublish.on('close', resolve);
      });

      if (exitCode === 0) {
        console.log('\n✓ npm 发布成功\n');
        rl.close();
        return true;
      } else {
        throw new Error(`npm publish exited with code ${exitCode}`);
      }
    } catch (error) {
      retries++;
      if (retries >= maxRetries) {
        console.error('\n❌ npm 发布失败，已达到最大重试次数');
        rl.close();
        throw error;
      }

      console.error(`\n⚠️  发布失败（第 ${retries} 次尝试）`);

      // 提示用户输入 OTP
      const otp = await new Promise((resolve) => {
        rl.question('\n🔐 请输入 npm 发送的 OTP 验证码: ', (answer) => {
          resolve(answer.trim());
        });
      });

      execSync(`npm publish --access public --otp=${otp}`, {
        stdio: 'inherit'
      });

      console.log('\n✓ npm ��布成功\n');
      rl.close();
      return true;
    }
  }
};

(async () => {
  try {
    await publishWithRetry();
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
    // 设置环境变量并执行��新脚本
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
})();
