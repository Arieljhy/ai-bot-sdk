const fs = require('fs');
const path = require('path');
const { version } = require('../package.json');

const changelogPath = path.resolve(__dirname, '../CHANGELOG.md');
const changelogMsg = process.env.CHANGELOG_MSG || '';

// 读取现有 changelog
const changelog = fs.existsSync(changelogPath)
  ? fs.readFileSync(changelogPath, 'utf-8')
  : '# Changelog\n\n';

// 检查版本是否已存在
if (changelog.includes(`## [${version}]`)) {
  console.log(`⚠️  版本 ${version} 已存在于 CHANGELOG.md 中`);
  process.exit(0);
}

// 处理 changelog 内容
const changes = changelogMsg
  ? changelogMsg.split('\n')
      .filter(line => line.trim())
      .map(line => line.trim().startsWith('-') ? line : `- ${line}`)
      .join('\n  ')
  : '- 待更新';

// 生成新版本条目
const date = new Date().toISOString().split('T')[0];
const newEntry = `## [${version}] - ${date}\n\n### 变更\n${changes}\n`;

// 插入到文件开头
const lines = changelog.split('\n');
let insertIndex = lines.findIndex(line => line.startsWith('## [')) || lines.length;
const updated = [
  ...lines.slice(0, insertIndex),
  newEntry.trim(),
  ...lines.slice(insertIndex)
].join('\n') + '\n';

fs.writeFileSync(changelogPath, updated);
console.log(`✅ CHANGELOG.md 已更新到版本 ${version}`);

if (!changelogMsg) {
  console.log('⚠️  请手动编辑 CHANGELOG.md 填写详细的更新内容');
}
