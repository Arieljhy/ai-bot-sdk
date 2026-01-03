# API 模块文件结构说明

## 目录结构

```
src/api/
├── config/              # 配置文件
│   └── servicePort.ts   # API 服务端口配置
├── helper/              # 辅助工具类
│   ├── checkStatus.ts   # HTTP 状态码检查
│   ├── fetchCancel.ts   # Fetch 请求取消和防重复处理（类）
│   └── fetchRetry.ts    # Fetch 请求重试机制
├── interface/           # 类型定义
│   ├── common.ts        # 通用接口定义
│   ├── chat.ts          # 对话模块接口
│   ├── config.ts        # 配置管理接口
│   ├── deduplicate.ts   # 防重复请求相关接口 ✨ 新增
│   ├── message.ts       # 消息管理接口
│   ├── session.ts       # 会话��理接口
│   └── index.ts         # 统一导出
├── modules/             # API 模块
│   ├── chat.ts          # 对话模块（核心）
│   ├── config.ts        # 配置管理模块
│   ├── message.ts       # 消息管理模块
│   ├── session.ts       # 会话管理模块
│   └── upload.ts        # 文件上传模块
├── utils/               # 工具函数 ✨ 新增
│   └── deduplicateUtils.ts  # 防重复请求工具函数
├── index.ts             # Axios 实例封装（Fetch 版本）
├── README.md            # API 使用文档
├── DEDUPLICATION_GUIDE.md # 防重复请求使用指南
└── OPTIMIZATION_GUIDE.md  # 优化指南
```

## 文件职责说明

### 1. 类型定义层 (`interface/`)

#### `deduplicate.ts` ✨ 新增
- **职责**: 防重复请求相关的所有类型定义
- **导出内容**:
  - `DuplicateStrategy`: 重复请求策略枚举（CANCEL/REUSE/THROTTLE）
  - `DeduplicateConfig`: 请求去重配置接口
  - `CacheItem`: 请求缓存项接口
  - `DeduplicateStats`: 请求去重统计信息接口
  - `DUPLICATE_STRATEGY`: 策略常量对象

### 2. 工具函数层 (`utils/`) ✨ 新增

#### `deduplicateUtils.ts` ✨ 新增
- **职责**: 防重复请求的核心工具函数
- **导出内容**:
  - `pendingMap`: 待处理请求 Map
  - `requestCacheMap`: 请求缓存 Map
  - `throttleMap`: 节流记录 Map
  - `updateDeduplicateConfig()`: 更新去重配置
  - `getDeduplicateConfig()`: 获取当前配置
  - `sortedStringify()`: 序列化参数
  - `getRequestKey()`: 获取请求唯一标识
  - `shouldThrottle()`: 检查是否需要节流
  - `cleanExpiredCache()`: 清理过期缓存
  - `cleanExpiredThrottle()`: 清理过期节流记录
  - `startAutoCleanup()`: 启动自动清理定时器

### 3. 辅助类层 (`helper/`)

#### `fetchCancel.ts` ✨ 重构
- **职责**: Fetch 请求取消和防重复处理的类封装
- **导出内容**:
  - `FetchCanceler`: 请求取消管理类
  - `fetchCanceler`: 默认实例
  - `updateDeduplicateConfig()`: 配置更新函数（重新导出）
  - 相关类型定义（重新导出）

**关键方法**:
- `addPending()`: 添加请求（根据策略处理重复请求）
- `removePending()`: 移除请求
- `cacheRequest()`: 缓存请求 Promise
- `getCachedRequest()`: 获取缓存的请求
- `clearAll()`: 清���所有缓存
- `getStats()`: 获取统计信息

## 解耦优势

### 1. **清晰的职责分离**
- **类型定义**: 所有类型集中在 `interface/` 目录
- **工具函数**: 纯函数逻辑在 `utils/` 目录
- **类封装**: 面向对象的封装在 `helper/` 目录

### 2. **更好的可维护性**
- 修改类型定义只需更新 `deduplicate.ts`
- 修改工具函数只需更新 `deduplicateUtils.ts`
- 修改类逻辑只需更新 `fetchCancel.ts`

### 3. **更好的可测试性**
- 工具函数可以单独测试
- 类方法可以单独测试
- 类型定义可以单独验证

### 4. **更好的可复用性**
- 工具函数可以被其他模块导入使用
- 类型定义可以被其他模块导入使用
- 类可以被实例化多次

## 导入关系

```typescript
// 类型定义
import type { DeduplicateConfig, DuplicateStrategy } from "@/api/interface/deduplicate";

// 工具函数
import {
  updateDeduplicateConfig,
  getRequestKey,
  shouldThrottle
} from "@/api/utils/deduplicateUtils";

// 类实例
import { fetchCanceler } from "@/api/helper/fetchCancel";

// 统一导出（推荐）
import {
  updateDeduplicateConfig,
  DuplicateStrategy,
  type DeduplicateConfig
} from "@/api";
```

## 使用示例

```typescript
// 1. 配置防重复策略
import { updateDeduplicateConfig, DuplicateStrategy } from '@/api';

updateDeduplicateConfig({
  strategy: DuplicateStrategy.REUSE,
  cacheTime: 5000
});

// 2. 发起请求（自动应用防重复策略）
import http from '@/api';

const result = await http.get('/api/data');

// 3. 获取统计信息
const stats = http.fetchCanceler.getStats();
console.log(stats);
// { pending: 2, cached: 3, throttled: 1 }
```

## 迁移指南

如果你在旧版本中直接从 `fetchCancel.ts` 导入：

```typescript
// ❌ 旧方式（仍然可用，但不推荐）
import { fetchCanceler, updateDeduplicateConfig } from '@/api/helper/fetchCancel';

// ✅ 新方式（推荐）
import http from '@/api';

http.fetchCanceler.getStats();
// 或直接从主入口导入
import { updateDeduplicateConfig } from '@/api';
```

## 后续优化建议

1. **考虑将更多工具函数移至 `utils/`**
   - URL 参数序列化函数
   - 数据转换函数
   - 验证函数

2. **考虑将更多类型定义移至 `interface/`**
   - 请求配置类型
   - 响应数据类型
   - 错误类型

3. **添加单元测试**
   - 为 `deduplicateUtils.ts` 添加纯函数测试
   - 为 `FetchCanceler` 类添加方法测试
