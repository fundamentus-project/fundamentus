import type { Credentials } from '../create-db-connection.js';
import type { drivers } from '../drivers.js';
export default function createEnv(client: keyof typeof drivers, credentials: Credentials, directory: string): Promise<void>;
