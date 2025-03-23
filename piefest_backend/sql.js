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
    }
}

async function ConnectAndQuery() {
    try {
        var poolConnection = await sql.connect(config);

        console.log("Reading rows from the Table...");
        var resultSet = await poolConnection.request().query(`SELECT * FROM test`);

        console.log(`${resultSet.recordset.length} rows returned.`);

        // output column headers
        var columns = "";
        for (var column in resultSet.recordset.columns) {
            columns += column + ", ";
        }
        console.log("%s\t", columns.substring(0, columns.length - 2));

        results = [];
        // output row contents from default record set
        resultSet.recordset.forEach(row => {
            console.log("%s\t%s", row.id, row['dummy_data']);
            results.push(row['dummy_data'])
        });

        // close connection only when we're certain application is finished
        poolConnection.close();

        return results;
    } catch (err) {
        console.error(err.message);
    }
}

async function VoteForPie(pieId, vote) {
    try {
        var poolConnection = await sql.connect(config);

        console.log("Inserting vote into the table...");
        await poolConnection.request()
            .input('pieId', sql.Int, pieId)
            .input('vote', sql.Double, vote)
            .query(`INSERT INTO test (pieId, vote) VALUES (@pieId, @vote)`);

        console.log("Vote casted successfully.");

        poolConnection.close();
    } catch (err) {
        console.error(err.message);
    }
}

module.exports = {
    ConnectAndQuery
}