import type { SchemaOverview } from '@directus/types';
import type { Knex } from 'knex';
import * as dateHelpers from './date/index.js';
import * as fnHelpers from './fn/index.js';
import * as geometryHelpers from './geometry/index.js';
import * as schemaHelpers from './schema/index.js';
export declare function getHelpers(database: Knex): {
    date: dateHelpers.mysql | dateHelpers.postgres | dateHelpers.mssql | dateHelpers.sqlite | dateHelpers.oracle;
    st: geometryHelpers.mysql | geometryHelpers.postgres | geometryHelpers.mssql | geometryHelpers.sqlite | geometryHelpers.oracle | geometryHelpers.redshift;
    schema: schemaHelpers.mysql | schemaHelpers.cockroachdb | schemaHelpers.mssql | schemaHelpers.postgres | schemaHelpers.sqlite | schemaHelpers.oracle;
};
export declare function getFunctions(database: Knex, schema: SchemaOverview): fnHelpers.mysql | fnHelpers.postgres | fnHelpers.mssql | fnHelpers.sqlite | fnHelpers.oracle;
export type Helpers = ReturnType<typeof getHelpers>;
