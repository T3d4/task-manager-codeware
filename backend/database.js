import sql from 'mssql';

export default class Database {
    config = {};
    poolconnection = null;
    connected = false;

    constructor(config) {
        this.config = config;
        console.log(`Database: config: ${JSON.stringify(config)}`);
    }

    async connect() {
        try {
            console.log(`Database connecting...${this.connected}`);
            if (this.connected === false) {
                this.poolconnection = await sql.connect(this.config);
                this.connected = true;
                console.log('Database connection successful');
            } else {
                console.log('Database already connected');
            }
        } catch (error) {
            console.error(`Error connecting to database: ${JSON.stringify(error)}`);
        }
    }

    async disconnect() {
        try {
            this.poolconnection.close();
            console.log('Database connection closed');
        } catch (error) {
            console.error(`Error closing database connection: ${error}`);
        }
    }

    async executeQuery(query) {
        await this.connect();
        const request = this.poolconnection.request();
        const result = await request.query(query);

        return result.rowsAffected[0];
    }

    async create(data) {
        await this.connect();
        const request = this.poolconnection.request();
        const isCompleteBit = data.isComplete ? 1 : 0;

        request.input('title', sql.NVarChar(255), data.title);
        request.input('dateCreated', sql.Date, data.dateCreated);
        request.input('isComplete', sql.Bit, isCompleteBit);

        const result = await request.query(
            `INSERT INTO Task (title, dateCreated, isComplete) VALUES (@title, @dateCreated, @isComplete)`
        );

        return result.rowsAffected[0];
    }

    async readAll() {
        await this.connect();
        const request = this.poolconnection.request();
        const result = await request.query(`SELECT * FROM Task`);

        return result.recordsets[0];
    }

    async read(id) {
        await this.connect();

        const request = this.poolconnection.request();
        const result = await request
            .input('id', sql.Int, +id)
            .query(`SELECT * FROM Task WHERE id = @id`);

        return result.recordset[0];
    }

    async update(id, data) {
        await this.connect();

        const request = this.poolconnection.request();
        const isCompleteBit = data.isComplete ? 1 : 0;

        request.input('id', sql.Int, +id);
        request.input('title', sql.NVarChar(255), data.title);
        request.input('dateCreated', sql.Date, data.dateCreated);
        request.input('isComplete', sql.Bit, isCompleteBit);

        // Build the dynamic SET clause based on provided fields
        const setClauses = [];
        if (data.title !== undefined) {
            setClauses.push('title = @title');
        }
        if (data.dateCreated !== undefined) {
            setClauses.push('dateCreated = @dateCreated');
        }
        if (data.isComplete !== undefined) {
            setClauses.push('isComplete = @isComplete');
        }

        const result = await request.query(
            `UPDATE Task SET ${setClauses.join(', ')} WHERE id = @id`
        );

        console.log(`updated result:::${result}`)
        return result.rowsAffected[0];
    }

    async delete(id) {
        await this.connect();

        const idAsNumber = Number(id);

        const request = this.poolconnection.request();
        const result = await request
            .input('id', sql.Int, idAsNumber)
            .query(`DELETE FROM Task WHERE id = @id`);

        return result.rowsAffected[0];
    }
}