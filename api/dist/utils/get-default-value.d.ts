import type { SchemaOverview } from '@directus/schema/types/overview';
import type { Column } from '@directus/schema';
export default function getDefaultValue(column: SchemaOverview[string]['columns'][string] | Column): string | boolean | number | Record<string, any> | any[] | null;
