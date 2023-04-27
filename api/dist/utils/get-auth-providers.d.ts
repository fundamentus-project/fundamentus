interface AuthProvider {
    label: string;
    name: string;
    driver: string;
    icon?: string;
}
export declare function getAuthProviders(): AuthProvider[];
export {};
