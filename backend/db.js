import mysql from 'mysql';

export function database(){
    const db=mysql.createPool({
        host:process.env.MYSQLHOST,
        user:process.env.MYSQLUSER,
        password:process.env.MYSQLPASSWORD,
        database:process.env.MYSQLDATABASE,
        port:process.env.MYSQLPORT
    })
    return db
}