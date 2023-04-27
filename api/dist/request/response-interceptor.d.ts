import type { AxiosResponse } from 'axios';
export declare const responseInterceptor: (config: AxiosResponse<any, any>) => Promise<AxiosResponse<any, any>>;
