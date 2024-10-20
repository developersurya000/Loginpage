import mysql from 'mysql';

export function database(){
    const db=mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"2580",
        database:"authentication"
    })
    return db
}