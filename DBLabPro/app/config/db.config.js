const dbconfig = {
    //First 5 is use for SQL server mssql connection
    user: 'foo',
    password: 'foo',
    database: 'ECommercialDB',
    server: 'LAPTOP-85S9C93G\\SQLEXPRESS',
    options: {
        trustedConnection: true,
        enableArithAbort: true,
        instancename: 'SQLEXPRESS'
    },
    port: 53337
};

module.exports = dbconfig;