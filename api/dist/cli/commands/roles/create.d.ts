export default function rolesCreate({ role: name, admin }: {
    role: string;
    admin: boolean;
}): Promise<void>;
