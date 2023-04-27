export default function usersCreate({ email, password, role, }: {
    email?: string;
    password?: string;
    role?: string;
}): Promise<void>;
