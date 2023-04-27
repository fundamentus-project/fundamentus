import type { AuthDriver } from './auth/auth.js';
export declare function getAuthProvider(provider: string): AuthDriver;
export declare function registerAuthProviders(): Promise<void>;
