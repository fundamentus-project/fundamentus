export default async function generateSecret() {
    const { nanoid } = await import('nanoid');
    process.stdout.write(nanoid(32));
    process.exit(0);
}
