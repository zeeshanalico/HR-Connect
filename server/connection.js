const dotenv = require('dotenv')
const mysql = require('mysql2');

dotenv.config({ path: './config.env' });
const config = {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    timezone: 'utc',
}
// console.log(config);
const connection = mysql.createConnection(config);

connection.connect((error) => {
    if (error) {
        console.log("there is Error" + error)
    } else {
        console.log("connected to database")
    }
})
module.exports = connection;