const { query } = require('../config/database');

const StudentModel = {
    getAllStudents: async () => {
        try {
            return await query('SELECT * FROM Students');
        } catch (error) {
            throw error;
        }
    },
    addStudent: async (Student_ID, Student_Name, Student_Reg_Num, Student_Email, Student_Contact_Number, Student_NIC, Student_Password, Batch_ID, Club_ID) => {
        try {
            const results = await query('INSERT INTO Students (Student_ID, Student_Name, Student_Reg_Num, Student_Email, Student_Contact_Number, Student_NIC, Student_Password, Batch_ID, Club_ID) ' +
                'VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [Student_ID, Student_Name, Student_Reg_Num, Student_Email, Student_Contact_Number, Student_NIC, Student_Password, Batch_ID, Club_ID]);
            return results;
        } catch (error) {
            throw error;
        }
    },
    getStudentById: async (Student_ID) => {
        try {
            const results = await query('SELECT * FROM Students WHERE Student_Id = ?', [Student_ID]);
            return results;
        } catch (error) {
            throw error;
        }
    },
    getStudentByEmail: async (Student_Email) => {
        try {
            const results = await query('SELECT * FROM Students WHERE Student_Email = ?', [Student_Email]);
            return results;
        } catch (error) {
            throw error;
        }
    },
    getStudentByName: async (Student_Name) => {
        try {
            const results = await query('SELECT * FROM Students WHERE Student_Name = ?', [Student_Name]);
            return results;
        } catch (error) {
            throw error;
        }
    },
    getStudentByRegNum: async (Student_Reg_Num) => {
        try {
            const results = await query('SELECT * FROM Students WHERE Student_Reg_Num = ?', [Student_Reg_Num]);
            return results;
        } catch (error) {
            throw error;
        }
    },
    updateStudent: async (Student_ID, Student_Name, Student_Reg_Num, Student_Email, Student_Contact_Number, Student_NIC, Student_Password, Batch_ID, Club_ID) => {
        try {
            const results = await query('UPDATE Students SET Student_Name = ?, Student_Reg_Num = ?, Student_Email = ?, Student_Contact_Number = ?, Student_NIC = ?, Student_Password = ?, Batch_ID = ?, Club_ID = ? WHERE Student_ID = ?', [Student_Name, Student_Reg_Num, Student_Email, Student_Contact_Number, Student_NIC, Student_Password, Batch_ID, Club_ID, Student_ID]);
            return results;
        } catch (error) {
            throw error;
        }
    },
    deleteStudent: async (Student_ID) => {
        try {
            const results = await query('DELETE FROM Students WHERE Student_ID = ?', [Student_ID]);
            return results;
        } catch (error) {
            throw error;
        }
    }
};

module.exports = StudentModel;