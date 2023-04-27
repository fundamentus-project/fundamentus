import path from 'path';
const filename = ({ filepath }) => ({
    type: 'input',
    name: 'filename',
    message: 'Database File Path:',
    default: path.join(filepath, 'data.db'),
});
const host = () => ({
    type: 'input',
    name: 'host',
    message: 'Database Host:',
    default: '127.0.0.1',
});
const port = ({ client }) => ({
    type: 'input',
    name: 'port',
    message: 'Port:',
    default() {
        const ports = {
            pg: 5432,
            cockroachdb: 26257,
            mysql: 3306,
            oracledb: 1521,
            mssql: 1433,
        };
        return ports[client];
    },
});
const database = () => ({
    type: 'input',
    name: 'database',
    message: 'Database Name:',
    default: 'directus',
});
const user = () => ({
    type: 'input',
    name: 'user',
    message: 'Database User:',
});
const password = () => ({
    type: 'password',
    name: 'password',
    message: 'Database Password:',
    mask: '*',
});
const encrypt = () => ({
    type: 'confirm',
    name: 'options__encrypt',
    message: 'Encrypt Connection:',
    default: false,
});
const ssl = () => ({
    type: 'confirm',
    name: 'ssl',
    message: 'Enable SSL:',
    default: false,
});
export const databaseQuestions = {
    sqlite3: [filename],
    mysql: [host, port, database, user, password],
    pg: [host, port, database, user, password, ssl],
    cockroachdb: [host, port, database, user, password, ssl],
    oracledb: [host, port, database, user, password],
    mssql: [host, port, database, user, password, encrypt],
};
