const fs = require('fs');
const path = require('path');
const packageJson = require('../package.json');

const version = packageJson.version;
const date = new Date().toISOString().split('T')[0];
const changelogPath = path.resolve(__dirname, '../CHANGELOG.md');

// 从环境变量获取 changelog 消息
const changelogMsg = process.env.CHANGELOG_MSG || '';

// 读取现有 changelog
let changelog = '';
if (fs.existsSync(changelogPath)) {
  changelog = fs.readFileSync(changelogPath, 'utf-8');
}

// 检查是否已存在该版本
const versionExists = changelog.includes(`## [${version}]`);

if (versionExists) {
  console.log(`⚠️  版本 ${version} 已存在于 CHANGELOG.md 中`);
  console.log('💡 如需更新内容，请手动编辑 CHANGELOG.md');
  process.exit(0);
}

// 生成 changelog 内容
let changelogContent = '';

if (changelogMsg) {
  // 解析消息内容，支持多条
  const lines = changelogMsg.split('\n').filter(line => line.trim());

  if (lines.length === 0) {
    changelogContent = '- 待更新';
  } else {
    changelogContent = lines.map(line => {
      const trimmed = line.trim();
      // 如果不是以 - 开头，自动添加
      return trimmed.startsWith('-') ? trimmed : `- ${trimmed}`;
    }).join('\n  ');
  }
} else {
  changelogContent = '- 待更新';
}

// 创建新版本条目
const newEntry = `## [${version}] - ${date}

### 变更
${changelogContent}

---
`;

// 插入到文件开头（在标题之后）
const lines = changelog.split('\n');
let insertIndex = 0;

// 跳过标题部分，找到第一个版本号的位置
for (let i = 0; i < lines.length; i++) {
  if (lines[i].startsWith('## [')) {
    insertIndex = i;
    break;
  }
}

// 如果没有找到版本号，插入到文件末尾
if (insertIndex === 0) {
  insertIndex = lines.length;
}

const updatedChangelog = [
  ...lines.slice(0, insertIndex),
  newEntry.trim(),
  ...lines.slice(insertIndex)
].join('\n');

fs.writeFileSync(changelogPath, updatedChangelog + '\n');

console.log(`✅ CHANGELOG.md 已更新到版本 ${version}`);
if (!changelogMsg) {
  console.log('⚠️  请手动编辑 CHANGELOG.md 填写详细的更新内容');
}
