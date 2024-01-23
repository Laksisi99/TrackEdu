const { query } = require('../config/database');

const BatchModel = {
    getAllBatches: async () => {
        try {
            return await query('SELECT * FROM Batches');
        } catch (error) {
            throw error;
        }
    },
    addBatch: async (Batch_ID,Batch_Start_Year, Batch_End_Year, Batch_Code) => {
        try {
            const results = await query('INSERT INTO Batches (Batch_ID, Batch_Start_Year, Batch_End_Year, Batch_Code) ' +
                'VALUES (?, ?, ?, ?)', [Batch_ID,Batch_Start_Year, Batch_End_Year, Batch_Code]);
            return results;
        } catch (error) {
            throw error;
        }
    },
    getBatchById: async (Batch_ID) => {
        try {
            const results = await query('SELECT * FROM Batches WHERE Batch_Id = ?', [Batch_ID]);
            return results;
        } catch (error) {
            throw error;
        }
    },
    getBatchByCode: async (Batch_Code) => {
        try {
            const results = await query('SELECT * FROM Batches WHERE Batch_Code = ?', [Batch_Code]);
            return results;
        } catch (error) {
            throw error;
        }
    },
    updateBatch: async (Batch_ID, Batch_Start_Year, Batch_End_Year, Batch_Code) => {
        try {
            const results = await query('UPDATE Batches SET Batch_Start_Year = ?, Batch_End_Year = ?, Batch_Code = ? WHERE Batch_ID = ?', [Batch_Start_Year, Batch_End_Year, Batch_Code, Batch_ID]);
            return results;
        } catch (error) {
            throw error;
        }
    },
    deleteBatch: async (Batch_ID) => {
        try {
            const results = await query('DELETE FROM Batches WHERE Batch_ID = ?', [Batch_ID]);
            return results;
        } catch (error) {
            throw error;
        }
    }
};

module.exports = BatchModel;
