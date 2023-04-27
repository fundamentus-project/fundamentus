type CreateOptions = {
    language?: string;
};
export default function create(type: string, name: string, options: CreateOptions): Promise<void>;
export {};
