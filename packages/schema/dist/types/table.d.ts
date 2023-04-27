export interface Table {
    name: string;
    comment?: string | null;
    schema?: string;
    collation?: string;
    engine?: string;
    owner?: string;
    sql?: string;
    catalog?: string;
}
