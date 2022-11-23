import mysql from 'mysql'

const connection = mysql.createConnection({
    host: '',
    user: '',
    password: '',
    database: '',
})

connection.connect(function (err) {
    if (err) {
        console.log('error connecting:' + err.stack)
    } else {
        console.log('connected successfully to DB.')
    }
})

export default connection
