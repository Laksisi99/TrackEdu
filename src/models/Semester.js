const { query } = require('../config/database');

const SemesterModel = {
    getAllSemesters: async () => {
        try {
            return await query('SELECT * FROM Semester_Details');
        } catch (error) {
            throw error;
        }
    },
    addSemester: async (Semester_Name) => {
        try {
            const results = await query('INSERT INTO Semester_Details (Semester_Name) ' +
                'VALUES (?)', [Semester_Name]);
            return results;
        } catch (error) {
            throw error;
        }
    },
    getSemesterById: async (Semester_ID) => {
        try {
            const results = await query('SELECT * FROM Semester_Details WHERE Semester_ID = ?', [Semester_ID]);
            return results;
        } catch (error) {
            throw error;
        }
    },
    getSemesterByName: async (Semester_Name) => {
        try {
            const results = await query('SELECT * FROM Semester_Details WHERE Semester_Name = ?', [Semester_Name]);
            return results;
        } catch (error) {
            throw error;
        }
    },
    updateSemester: async (Semester_ID, Semester_Name) => {
        try {
            const results = await query('UPDATE Semester_Details SET Semester_Name = ? WHERE Semester_ID = ?', [Semester_Name, Semester_ID]);
            return results;
        } catch (error) {
            throw error;
        }
    },
    deleteSemester: async (Semester_ID) => {
        try {
            const results = await query('DELETE FROM Semester_Details WHERE Semester_ID = ?', [Semester_ID]);
            return results;
        } catch (error) {
            throw error;
        }
    }
};

module.exports = SemesterModel;