import mysql from 'mysql';

export const poolConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rootpassword', // set to env variables
    database: 'findia',
    insecureAuth : true
});

