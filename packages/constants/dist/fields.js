export const KNEX_TYPES = [
    'bigInteger',
    'boolean',
    'date',
    'dateTime',
    'decimal',
    'float',
    'integer',
    'json',
    'string',
    'text',
    'time',
    'timestamp',
    'binary',
    'uuid',
];
export const TYPES = [
    ...KNEX_TYPES,
    'alias',
    'hash',
    'csv',
    'geometry',
    'geometry.Point',
    'geometry.LineString',
    'geometry.Polygon',
    'geometry.MultiPoint',
    'geometry.MultiLineString',
    'geometry.MultiPolygon',
    'unknown',
];
export const GEOMETRY_TYPES = [
    'Point',
    'LineString',
    'Polygon',
    'MultiPoint',
    'MultiLineString',
    'MultiPolygon',
];
export const GEOMETRY_FORMATS = ['native', 'geojson', 'wkt', 'lnglat'];
export const LOCAL_TYPES = [
    'standard',
    'file',
    'files',
    'm2o',
    'o2m',
    'm2m',
    'm2a',
    'presentation',
    'translations',
    'group',
];
export const RELATIONAL_TYPES = [
    'file',
    'files',
    'm2o',
    'o2m',
    'm2m',
    'm2a',
    'presentation',
    'translations',
    'group',
];
export const FUNCTIONS = ['year', 'month', 'week', 'day', 'weekday', 'hour', 'minute', 'second', 'count'];
