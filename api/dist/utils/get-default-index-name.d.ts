/**
 * Generate an index name for a given collection + fields combination.
 *
 * Is based on the default index name generation of knex, but limits the index to a maximum of 64
 * characters (the max length for MySQL and MariaDB).
 *
 * @see
 * https://github.com/knex/knex/blob/fff6eb15d7088d4198650a2c6e673dedaf3b8f36/lib/schema/tablecompiler.js#L282-L297
 */
export declare function getDefaultIndexName(type: 'unique' | 'foreign' | 'index', collection: string, fields: string | string[]): string;
