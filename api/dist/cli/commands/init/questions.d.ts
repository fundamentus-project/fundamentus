export declare const databaseQuestions: {
    sqlite3: (({ filepath }: {
        filepath: string;
    }) => Record<string, string>)[];
    mysql: (({ client }: {
        client: string;
    }) => Record<string, any>)[];
    pg: (({ client }: {
        client: string;
    }) => Record<string, any>)[];
    cockroachdb: (({ client }: {
        client: string;
    }) => Record<string, any>)[];
    oracledb: (({ client }: {
        client: string;
    }) => Record<string, any>)[];
    mssql: (({ client }: {
        client: string;
    }) => Record<string, any>)[];
};
