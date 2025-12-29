#!/bin/bash

# 智能客服 SDK 发布脚本
# 使用方法: ./scripts/publish.sh [patch|minor|major]

set -e  # 遇到错误立即退出

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 打印彩色消息
print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# 检查参数
if [ $# -eq 0 ]; then
    print_info "使用方法: ./scripts/publish.sh [patch|minor|major]"
    echo ""
    echo "版本类型说明:"
    echo "  patch  - 1.0.0 → 1.0.1 (bug 修复)"
    echo "  minor  - 1.0.0 → 1.1.0 (新功能)"
    echo "  major  - 1.0.0 → 2.0.0 (破坏性变更)"
    exit 1
fi

VERSION_TYPE=$1

# 验证版本类型
if [[ ! "$VERSION_TYPE" =~ ^(patch|minor|major)$ ]]; then
    print_error "无效的版本类型: $VERSION_TYPE"
    print_info "请使用: patch, minor, 或 major"
    exit 1
fi

# 开始发布流程
echo ""
print_info "======================================"
print_info "开始发布 @ariel_jhy/ai-bot-adk"
print_info "======================================"
echo ""

# 1. 检查是否登录 npm
print_info "检查 npm 登录状态..."
if ! npm whoami > /dev/null 2>&1; then
    print_error "未登录 npm，请先运行: npm login"
    exit 1
fi
NPM_USER=$(npm whoami)
print_success "已登录 npm: $NPM_USER"

# 2. 检查工作区是否干净
print_info "检查 Git 工作区..."
if [ -n "$(git status --porcelain)" ]; then
    print_error "工作区有未提交的更改，请先提交或暂存"
    git status --short
    exit 1
fi
print_success "工作区干净"

# 3. 检查当前分支
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "main" ] && [ "$CURRENT_BRANCH" != "master" ]; then
    print_warning "当前不在主分支 (main/master)，当前分支: $CURRENT_BRANCH"
    read -p "是否继续? (y/N) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        print_info "已取消发布"
        exit 1
    fi
fi

# 4. 运行测试
print_info "运行类型检查..."
if ! npm run type-check > /dev/null 2>&1; then
    print_error "类型检查失败，请先修复类型错误"
    npm run type-check
    exit 1
fi
print_success "类型检查通过"

# 5. 构建项目
print_info "构建项目..."
if ! npm run build:lib > /dev/null 2>&1; then
    print_error "构建失败"
    npm run build:lib
    exit 1
fi
print_success "构建成功"

# 6. 检查 dist 目录
if [ ! -d "dist" ] || [ -z "$(ls -A dist)" ]; then
    print_error "dist 目录为空，构建可能失败"
    exit 1
fi
print_success "构建产物已生成"

# 7. 显示当前版本
CURRENT_VERSION=$(node -p "require('./package.json').version")
print_info "当前版本: $CURRENT_VERSION"

# 8. 更新版本号
print_info "更新版本号: $VERSION_TYPE"
npm version $VERSION_TYPE -m "chore: bump version to %s"

NEW_VERSION=$(node -p "require('./package.json').version")
print_success "新版本: $NEW_VERSION"

# 9. 预览发布内容
print_info "预览发布内容..."
echo ""
npm pack --dry-run
echo ""

# 10. 确认发布
read -p "确认发布版本 $NEW_VERSION? (y/N) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    print_error "已取消发布"
    print_info "如需恢复版本号，运行: git reset --hard HEAD~1"
    exit 1
fi

# 11. 发布到 npm
print_info "发布到 npm..."
if npm publish --access public; then
    print_success "发布成功！"
else
    print_error "发布失败"
    print_info "如需恢复版本号，运行: git reset --hard HEAD~1"
    exit 1
fi

# 12. 推送到远程仓库
print_info "推送到远程仓库..."
git push origin $CURRENT_BRANCH
git push origin --tags

# 13. 验证发布
print_info "验证发布..."
sleep 3  # 等待 npm 索引更新
PUBLISHED_VERSION=$(npm view @ariel_jhy/ai-bot-adk version)
if [ "$PUBLISHED_VERSION" == "$NEW_VERSION" ]; then
    print_success "验证成功！已发布版本: $PUBLISHED_VERSION"
else
    print_warning "验证失败，请手动检查: npm view @ariel_jhy/ai-bot-adk"
fi

# 完成
echo ""
print_success "======================================"
print_success "发布完成！"
print_success "======================================"
echo ""
print_info "包信息:"
print_info "  名称: @ariel_jhy/ai-bot-adk"
print_info "  版本: $NEW_VERSION"
print_info "  链接: https://www.npmjs.com/package/@ariel_jhy/ai-bot-adk"
echo ""
print_info "安装命令:"
echo "  npm install @ariel_jhy/ai-bot-adk@$NEW_VERSION"
echo ""
