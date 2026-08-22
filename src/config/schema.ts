// ============================================================
// NUAAgent 默认配置 schema（唯一真源：src/config/default-models.json）
// 约束：新增/修改默认模型、默认重试或超时，一律改 default-models.json，
//       本文件只做类型化导出（不重复维护数据）。
// ============================================================
import defaultModels from './default-models.json' with { type: 'json' };

/** 默认模型清单（nuaagent init 写入 config.json 的 models 字段） */
export interface NuaaModelEntry {
  id: string;
  name?: string;
  /** 声明模态（视觉模型为 ['text','image']，缺省由 launch.mjs 按 id 自动补齐） */
  input?: Array<'text' | 'image'>;
}

/** 默认重试策略：正常模式，至少重试 10 次（provider 级，覆盖视觉模型） */
export interface NuaaRetryPolicy {
  mode: 'normal';
  maxRetries: number;
  backoff: { initialDelayMs: number; maxDelayMs: number };
}

export const NUAA_API_BASE_URL: string = defaultModels.apiBaseUrl;
export const NUAA_DEFAULT_MODEL: string = defaultModels.model;
export const NUAA_MODELS: NuaaModelEntry[] = defaultModels.models;
export const NUAA_DEFAULT_RETRY_POLICY: NuaaRetryPolicy = defaultModels.retryPolicy;
export const NUAA_DEFAULT_TIMEOUT_MS: number = defaultModels.timeoutMs;
export const NUAA_DEFAULT_STREAM_IDLE_TIMEOUT_MS: number = defaultModels.streamIdleTimeoutMs;

/** 与 dsh-adapter/launch.mjs 的默认值保持一致（改动前请同步两边） */
export const DEFAULTS = {
  apiBaseUrl: NUAA_API_BASE_URL,
  model: NUAA_DEFAULT_MODEL,
  models: NUAA_MODELS,
  retryPolicy: NUAA_DEFAULT_RETRY_POLICY,
  timeoutMs: NUAA_DEFAULT_TIMEOUT_MS,
  streamIdleTimeoutMs: NUAA_DEFAULT_STREAM_IDLE_TIMEOUT_MS,
} as const;