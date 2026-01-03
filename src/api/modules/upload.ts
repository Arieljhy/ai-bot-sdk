/**
 * 文件上传模块 - 增强版
 * 支持上传进度、取消上传等高级功能
 */

import type { ResultData, FileUploadResponse } from "@/api/interface/common";
import { UPLOAD_BASE } from "@/api/config/servicePort";
import http from "@/api";

/**
 * 上传进度回调
 */
export type UploadProgressCallback = (progress: {
  percent: number;
  loaded: number;
  total: number;
}) => void;

/**
 * 上传图片
 * @param file 图片文件
 * @param onProgress 上传进度回调
 * @returns Promise<ResultData<FileUploadResponse>>
 */
export const uploadImage = (
  file: File,
  onProgress?: UploadProgressCallback
): Promise<ResultData<FileUploadResponse>> => {
  const formData = new FormData();
  formData.append("file", file);
  return http.post<FileUploadResponse>(UPLOAD_BASE + `/upload/image`, formData, {
    cancel: false,
    loading: false,
    headers: {
      "Content-Type": "multipart/form-data"
    },
    onUploadProgress: progressEvent => {
      if (progressEvent.total && onProgress) {
        const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        onProgress({
          percent,
          loaded: progressEvent.loaded,
          total: progressEvent.total
        });
      }
    }
  }) as Promise<ResultData<FileUploadResponse>>;
};

/**
 * 上传多张图片
 * @param files 图片文件数组
 * @param onProgress 上传进度回调
 * @returns Promise<ResultData<FileUploadResponse[]>>
 */
export const uploadImages = (
  files: File[],
  onProgress?: UploadProgressCallback
): Promise<ResultData<FileUploadResponse[]>> => {
  const formData = new FormData();
  files.forEach(file => {
    formData.append("files", file);
  });
  return http.post<FileUploadResponse[]>(UPLOAD_BASE + `/upload/images`, formData, {
    cancel: false,
    loading: false,
    headers: {
      "Content-Type": "multipart/form-data"
    },
    onUploadProgress: progressEvent => {
      if (progressEvent.total && onProgress) {
        const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        onProgress({
          percent,
          loaded: progressEvent.loaded,
          total: progressEvent.total
        });
      }
    }
  }) as Promise<ResultData<FileUploadResponse[]>>;
};

/**
 * 上传文档（PDF、Word、Excel等）
 * @param file 文档文件
 * @param onProgress 上传进度回调
 * @returns Promise<ResultData<FileUploadResponse>>
 */
export const uploadDocument = (
  file: File,
  onProgress?: UploadProgressCallback
): Promise<ResultData<FileUploadResponse>> => {
  const formData = new FormData();
  formData.append("file", file);
  return http.post<FileUploadResponse>(UPLOAD_BASE + `/upload/document`, formData, {
    cancel: false,
    loading: false,
    headers: {
      "Content-Type": "multipart/form-data"
    },
    onUploadProgress: progressEvent => {
      if (progressEvent.total && onProgress) {
        const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        onProgress({
          percent,
          loaded: progressEvent.loaded,
          total: progressEvent.total
        });
      }
    }
  }) as Promise<ResultData<FileUploadResponse>>;
};

/**
 * 上传视频
 * @param file 视频文件
 * @param onProgress 上传进度回调
 * @returns Promise<ResultData<FileUploadResponse>>
 */
export const uploadVideo = (
  file: File,
  onProgress?: UploadProgressCallback
): Promise<ResultData<FileUploadResponse>> => {
  const formData = new FormData();
  formData.append("file", file);
  return http.post<FileUploadResponse>(UPLOAD_BASE + `/upload/video`, formData, {
    cancel: false,
    loading: false,
    headers: {
      "Content-Type": "multipart/form-data"
    },
    onUploadProgress: progressEvent => {
      if (progressEvent.total && onProgress) {
        const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        onProgress({
          percent,
          loaded: progressEvent.loaded,
          total: progressEvent.total
        });
      }
    }
  }) as Promise<ResultData<FileUploadResponse>>;
};

/**
 * 上传音频
 * @param file 音频文件
 * @param onProgress 上传进度回调
 * @returns Promise<ResultData<FileUploadResponse>>
 */
export const uploadAudio = (
  file: File,
  onProgress?: UploadProgressCallback
): Promise<ResultData<FileUploadResponse>> => {
  const formData = new FormData();
  formData.append("file", file);
  return http.post<FileUploadResponse>(UPLOAD_BASE + `/upload/audio`, formData, {
    cancel: false,
    loading: false,
    headers: {
      "Content-Type": "multipart/form-data"
    },
    onUploadProgress: progressEvent => {
      if (progressEvent.total && onProgress) {
        const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        onProgress({
          percent,
          loaded: progressEvent.loaded,
          total: progressEvent.total
        });
      }
    }
  }) as Promise<ResultData<FileUploadResponse>>;
};

/**
 * 通用文件上传
 * @param file 任意文件
 * @param onProgress 上传进度回调
 * @returns Promise<ResultData<FileUploadResponse>>
 */
export const uploadFile = (
  file: File,
  onProgress?: UploadProgressCallback
): Promise<ResultData<FileUploadResponse>> => {
  const formData = new FormData();
  formData.append("file", file);
  return http.post<FileUploadResponse>(UPLOAD_BASE + `/upload/file`, formData, {
    cancel: false,
    loading: false,
    headers: {
      "Content-Type": "multipart/form-data"
    },
    onUploadProgress: progressEvent => {
      if (progressEvent.total && onProgress) {
        const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        onProgress({
          percent,
          loaded: progressEvent.loaded,
          total: progressEvent.total
        });
      }
    }
  }) as Promise<ResultData<FileUploadResponse>>;
};

/**
 * 上传Base64图片
 * @param base64Data Base64编码的图片数据
 * @returns Promise<ResultData<FileUploadResponse>>
 */
export const uploadBase64Image = (base64Data: string): Promise<ResultData<FileUploadResponse>> => {
  return http.post<FileUploadResponse>(
    UPLOAD_BASE + `/upload/base64`,
    { data: base64Data },
    { cancel: false, loading: false }
  );
};

/**
 * 获取上传文件大小限制
 * @returns Promise<ResultData<{ maxSize: number; allowedTypes: string[] }>>
 */
export const getUploadLimits = (): Promise<
  ResultData<{ maxSize: number; allowedTypes: string[]; allowedExtensions: string[] }>
> => {
  return http.get<{ maxSize: number; allowedTypes: string[]; allowedExtensions: string[] }>(
    UPLOAD_BASE + `/upload/limits`,
    {},
    { loading: false, cancel: false }
  );
};

/**
 * 验证文件
 * @param file 文件对象
 * @param allowedTypes 允许的文件类型
 * @param maxSize 最大文件大小（字节）
 * @returns 验证结果
 */
export const validateFile = (
  file: File,
  allowedTypes: string[],
  maxSize: number
): { valid: boolean; error?: string } => {
  // 检查文件类型
  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: `不支持的文件类型：${file.type}`
    };
  }

  // 检查文件大小
  if (file.size > maxSize) {
    const maxSizeMB = (maxSize / 1024 / 1024).toFixed(2);
    return {
      valid: false,
      error: `文件大小超过限制（最大 ${maxSizeMB}MB）`
    };
  }

  return { valid: true };
};
