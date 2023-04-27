import { v4 as uuidv4 } from 'uuid';
export default async function generateKey() {
    process.stdout.write(uuidv4());
    process.exit(0);
}
