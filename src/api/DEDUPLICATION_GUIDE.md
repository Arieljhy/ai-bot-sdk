# 防重复请求功能使用指���

## 功能概述

SDK 内置了强大的防重复请求功能，支持三种策略来处理重复请求，有效减少不必要的网络请求和服务器压力。

## 三种防重复策略

### 1. CANCEL（取消模式）- 默认策略

取消之前正在进行的相同请求，发起新请求。

**适用场景：**
- 用户频繁点击按钮，只需要最后一次请求的结果
- 实时搜索、自动补全等场景

```typescript
import http from '@/api';

// 默认使用 CANCEL 模式，无需额外配置
const result = await http.get('/api/user/info');
```

### 2. REUSE（复用模式）

复用正在进行的相同请求，多个相同请求共享同一个 Promise��

**适用场景：**
- 页面多个组件同时请求同一个接口
- 避免重复请求相同数据

```typescript
import http, { updateDeduplicateConfig, DuplicateStrategy } from '@/api';

// 切换到复用模式
updateDeduplicateConfig({
  strategy: DuplicateStrategy.REUSE,
  cacheTime: 5000 // 缓存时间 5 秒
});

// 多个相同请求会自动复用
const promise1 = http.get('/api/config');
const promise2 = http.get('/api/config'); // 复用第一个请求的 Promise

// promise1 === promise2 (true)
```

### 3. THROTTLE（节流模式）

在指定时间内只允许一次请求，超过时间限制的请求会被静默忽略。

**适用场景：**
- 防止用户快速连续点击
- 防止滚动事件触发过多请求

```typescript
import http, { updateDeduplicateConfig, DuplicateStrategy } from '@/api';

// 切换到节流模式
updateDeduplicateConfig({
  strategy: DuplicateStrategy.THROTTLE,
  throttleTime: 1000 // 1 秒内只允许一次请求
});

// 快速连续点击，只会执行第一次
http.post('/api/submit', data);
http.post('/api/submit', data); // 被节流，静默忽略
http.post('/api/submit', data); // 被节流，静默忽略
```

## 配置选项

### 全局配置

```typescript
import { updateDeduplicateConfig, DuplicateStrategy } from '@/api';

updateDeduplicateConfig({
  strategy: DuplicateStrategy.REUSE,    // 策略选择
  throttleTime: 1000,                    // 节流时间（毫秒）
  cacheTime: 5000                        // 缓存时间（毫秒）
});
```

### 单次请求配置

可以通过 `cancel: false` 关闭单次请求的防重复功能：

```typescript
import http from '@/api';

// 关闭防重复，每次都发起新请求
const result = await http.get('/api/data', {}, { cancel: false });
```

## 高级用法

### 获取统计信息

```typescript
import http from '@/api';

// 获取当前 pending、缓存和节流的请求数量
const stats = http.fetchCanceler.getStats();
console.log(stats);
// {
//   pending: 2,      // 正在进行的请求数
//   cached: 3,       // 缓存的请求数
//   throttled: 1     // 被节流的请求数
// }
```

### 清理缓存

```typescript
import http from '@/api';

// 清空所有缓存
http.fetchCanceler.clearCache();

// 清空所有（pending + cache + throttle）
http.fetchCanceler.clearAll();
```

## 使用示例

### 示例 1：搜索框自动补全

```typescript
import { updateDeduplicateConfig, DuplicateStrategy } from '@/api';

// 使用复用模式，避免搜索时重复请求
updateDeduplicateConfig({
  strategy: DuplicateStrategy.REUSE,
  cacheTime: 2000
});

async function onSearch(keyword: string) {
  const result = await http.get('/api/search', { keyword });
  return result;
}
```

### 示例 2：提交按钮防重复点击

```typescript
import { updateDeduplicateConfig, DuplicateStrategy } from '@/api';

// 使用节流模式，防止用户快速连续点击
updateDeduplicateConfig({
  strategy: DuplicateStrategy.THROTTLE,
  throttleTime: 2000 // 2 秒内只允许一次提交
});

async function onSubmit(formData: any) {
  try {
    const result = await http.post('/api/submit', formData);
    console.log('提交成功', result);
  } catch (error) {
    // 被节流的请求不会进入这里
    console.error('提交失败', error);
  }
}
```

### 示例 3：页面多组件共享数据

```typescript
import { updateDeduplicateConfig, DuplicateStrategy } from '@/api';

// 使用复用模式，多个组件共享请求
updateDeduplicateConfig({
  strategy: DuplicateStrategy.REUSE,
  cacheTime: 5000
});

// 组件 A
const data1 = await http.get('/api/user/info');

// 组件 B（几乎同时请求）
const data2 = await http.get('/api/user/info');

// 两个请求会共享同一个 Promise，只发起一次网络请求
```

## 工作原理

### 请求标识生成

系统通过以下信息生成唯一的请求标识：

- 请求方法（GET/POST/PUT/DELETE）
- 请求 URL
- 请求体（body）
- 查询参数（params）

```typescript
// 这两个请求被视为相同请求
http.get('/api/users', { page: 1, size: 10 });
http.get('/api/users', { page: 1, size: 10 });

// 这两个请求被视为不同请求（参数不同）
http.get('/api/users', { page: 1 });
http.get('/api/users', { page: 2 });
```

### 自动清理

- **请求缓存**：请求完成后 100ms 自动清理
- **过期缓存**：每 10 秒自动清理过期的缓存项
- **节流记录**：超过节流时间后自动清理

## 最佳实践

1. **根据场景选择合适的策略**
   - 实时搜索：使用 REUSE 模式
   - 表单提交：使用 THROTTLE 模式
   - 数据刷新：使用 CANCEL 模式

2. **合理设置缓存时间**
   - 频繁变化的数据：设置较短缓存时间（1-2 秒）
   - 相对稳定的数据：设置较长缓存时间（5-10 秒）

3. **注意错误处理**
   - 节流模式下被忽略的请求不会触发 catch
   - 复用模式下所有共享请求共享同一个错误

4. **监控性能**
   - 使用 `getStats()` 监控请求数量
   - 根据实际情况调整配置参数
