const { query } = require('../config/database');


const LecturerModel = {
    getAllLecturers: async () => {
        try {
            return await query('SELECT * FROM Lecturers');
        } catch (error) {
            throw error;
        }
    },
    addLecturer: async (Lecturer_ID, Lecturer_Name, Lecturer_Email, Lecturer_Contact_Number, Lecturer_NIC, Lecturer_Password) => {
        try {
            const results = await query('INSERT INTO Lecturers (Lecturer_ID, Lecturer_Name, Lecturer_Email, Lecturer_Contact_Number, Lecturer_NIC, Lecturer_Password) ' +
                'VALUES (?, ?, ?, ?, ?, ?)', [Lecturer_ID, Lecturer_Name, Lecturer_Email, Lecturer_Contact_Number, Lecturer_NIC, Lecturer_Password]);
            return results;
        } catch (error) {
            throw error;
        }
    },
    getLecturerById: async (Lecturer_ID) => {
        try {
            const results = await query('SELECT * FROM Lecturers WHERE Lecturer_Id = ?', [Lecturer_ID]);
            return results;
        } catch (error) {
            throw error;
        }
    },
    getLecturerByEmail: async (Lecturer_Email) => {
        try {
            const results = await query('SELECT * FROM Lecturers WHERE Lecturer_Email = ?', [Lecturer_Email]);
            return results;
        } catch (error) {
            throw error;
        }
    },
    getLecturerByName: async (Lecturer_Name) => {
        try {
            const results = await query('SELECT * FROM Lecturers WHERE Lecturer_Name = ?', [Lecturer_Name]);
            return results;
        } catch (error) {
            throw error;
        }
    },
    updateLecturer: async (Lecturer_ID, Lecturer_Name, Lecturer_Email, Lecturer_Contact_Number, Lecturer_NIC, Lecturer_Password) => {
        try {
            const results = await query('UPDATE Lecturers SET Lecturer_Name = ?, Lecturer_Email = ?, Lecturer_Contact_Number = ?, Lecturer_NIC = ?, Lecturer_Password = ? WHERE Lecturer_ID = ?', [Lecturer_Name, Lecturer_Email, Lecturer_Contact_Number, Lecturer_NIC, Lecturer_Password, Lecturer_ID]);
            return results;
        } catch (error) {
            throw error;
        }
    },
    deleteLecturer: async (Lecturer_ID) => {
        try {
            const results = await query('DELETE FROM Lecturers WHERE Lecturer_ID = ?', [Lecturer_ID]);
            return results;
        } catch (error) {
            throw error;
        }
    }
};

module.exports = LecturerModel;


