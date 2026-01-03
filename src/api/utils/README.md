# API 工具函数

本目录包含 API 模块中使用的工具函数。

## 文件说明

### deduplicateUtils.ts

防重复请求相关的工具函数。

#### 导出内容

- **Maps**:
  - `pendingMap`: 待处理请求 Map
  - `requestCacheMap`: 请求缓存 Map
  - `throttleMap`: 节流记录 Map

- **配置函数**:
  - `updateDeduplicateConfig(config)`: 更新去重配置
  - `getDeduplicateConfig()`: 获取当前配置

- **工具函数**:
  - `sortedStringify(obj)`: 序列化参数，确保对象属性顺序一致
  - `getRequestKey(config)`: 获取请求的唯一标识
  - `shouldThrottle(key)`: 检查是否需要节流
  - `cleanExpiredCache()`: 清理过期的缓存项
  - `cleanExpiredThrottle()`: 清理过期的节流记录
  - `startAutoCleanup()`: 启动自动清理定时器

#### 使用示例

```typescript
import {
  getRequestKey,
  shouldThrottle,
  updateDeduplicateConfig
} from '@/api/utils/deduplicateUtils';

// 获取请求唯一标识
const key = getRequestKey({
  method: 'GET',
  url: '/api/users',
  params: { page: 1 }
});

// 检查是否节流
if (shouldThrottle(key)) {
  console.log('请求被节流');
}

// 更新配置
updateDeduplicateConfig({
  strategy: DuplicateStrategy.REUSE,
  cacheTime: 5000
});
```

## 设计原则

1. **纯函数优先**: 所有导出函数都是纯函数，无副作用
2. **类型安全**: 完整的 TypeScript 类型定义
3. **可测试性**: 函数独立，易于单元测试
4. **可复用性**: 可以被其他模块独立导入使用
