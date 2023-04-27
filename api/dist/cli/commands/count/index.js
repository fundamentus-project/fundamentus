import getDatabase from '../../../database/index.js';
import logger from '../../../logger.js';
export default async function count(collection) {
    const database = getDatabase();
    if (!collection) {
        logger.error('Collection is required');
        process.exit(1);
    }
    try {
        const records = await database(collection).count('*', { as: 'count' });
        const count = Number(records[0].count);
        process.stdout.write(`${count}\n`);
        database.destroy();
        process.exit(0);
    }
    catch (err) {
        logger.error(err);
        database.destroy();
        process.exit(1);
    }
}
