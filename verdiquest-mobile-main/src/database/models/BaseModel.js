const db = require('../database');

class BaseModel {
    constructor(tableName) {
        this.tableName = tableName;
    }

    async insert(data) {
        try {
            // Convert data to an array of arrays if it's not already
            const dataArray = Array.isArray(data[0]) ? data : [data];
            const [result] = await db.query(`INSERT INTO ${this.tableName} VALUES ?`, [dataArray]);
            return result;
        } catch (error) {
            console.error(`Error inserting into table ${this.tableName}:`, error);
            throw error;
        }
    }

    async getById(id) {
        return this.getByColumn('id', id);
    }

    async getByColumn(column, value) {
        try {
            const [rows] = await db.query(`SELECT * FROM ${this.tableName} WHERE ${column} = ?`, [value]);
            if (rows.length) {
                return rows[0];
            }
            return null;
        } catch (error) {
            console.error(`Error fetching from table ${this.tableName} by ${column}:`, error);
            throw error;
        }
    }

    async removeByColumn(column, value) {
        try {
            const [result] = await db.query(`DELETE FROM ${this.tableName} WHERE ${column} = ?`, [value]);
            return result;
        } catch (error) {
            console.error(`Error removing from table ${this.tableName} by ${column}:`, error);
            throw error;
        }
    }

    async updateByColumn(data, column, value) {
        try {
            if (typeof data !== 'object' || Array.isArray(data)) {
                throw new Error('Data for update should be an object with key-value pairs.');
            }
    
            const [result] = await db.query(`UPDATE ${this.tableName} SET ? WHERE ${column} = ?`, [data, value]);
            return result;
        } catch (error) {
            console.error(`Error updating table ${this.tableName} by ${column}:`, error);
            throw error;
        }
    }
    
}

module.exports = BaseModel;
