import type { InternalAxiosRequestConfig } from 'axios';
export declare const requestInterceptor: (config: InternalAxiosRequestConfig) => Promise<InternalAxiosRequestConfig<any>>;
