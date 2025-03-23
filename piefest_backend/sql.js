require('dotenv').config();
const sql = require('mssql');

const config = {
    user:  process.env.SQL_ADMIN_USERNAME, // better stored in an app setting such as process.env.DB_USER
    password: process.env.SQL_ADMIN_PASSWORD, // better stored in an app setting such as process.env.DB_PASSWORD
    server: process.env.SQL_SERVER_NAME, // better stored in an app setting such as process.env.DB_SERVER
    port: parseInt(process.env.SQL_SERVER_PORT, 1433), // optional, defaults to 1433, better stored in an app setting such as process.env.DB_PORT
    database: process.env.SQL_DB, // better stored in an app setting such as process.env.DB_NAME
    options: {
        encrypt: true,
        trustServerCertificate: true
    },
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    }
}

const pool = new sql.ConnectionPool(config);

pool.on('error', err => {
    console.error('SQL Pool Error:', err);
});


// Makes a connection to the database and executes the query, returns the result set or null on failure.
// @param sqlQuery - The SQL query to execute
// @param paramMap - A map of parameters for the SQL query
// Caller needs to handle any exceptions properly
async function ConnectAndQuery(sqlQuery, paramMap = new Map()) {
    var connection = await pool.connect();

    var request = connection.request();

    // Iterate over the parameter map and add inputs
    for (const [paramName, paramValue] of paramMap) {
        request.input(paramName, paramValue);
    }

    var resultSet = await request.query(sqlQuery);

    // close connection only when we're certain application is finished
    connection.close();

    return resultSet.recordset;
}

async function VoteForPie(pieId, vote, userID) {
    try {
        const sqlQuery = `INSERT INTO test (pieId, vote, userID) VALUES (${pieId}, ${vote}, ${userID})`;
        await ConnectAndQuery(sqlQuery);
        console.log("Vote casted successfully.");
    } catch (err) {
        console.error(`Vote cast failed: ${err.message}`);
    }
}

module.exports = {
    ConnectAndQuery
}