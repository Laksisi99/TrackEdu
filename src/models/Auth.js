const { query } = require('../config/database');

const authModel = {
    authAdmin: async (Admin_Email, Admin_Password) => {
        try {
            return await query('SELECT * FROM Admin WHERE Admin_Email = ? AND Admin_Password = ?', [Admin_Email, Admin_Password]);
        } catch (error) {
            throw error;
        }
    },
    authStudents: async (Student_Email, Student_Password) => {
        try {
            return await query('SELECT * FROM Students WHERE Student_Email = ? AND Student_Password = ?', [Student_Email, Student_Password]);
        } catch (error) {
            throw error;
        }
    },
    authLecturers: async (Lecturer_Email, Lecturer_Password) => {
        try {
            return await query('SELECT * FROM Lecturers WHERE Lecturer_Email = ? AND Lecturer_Password = ?', [Lecturer_Email, Lecturer_Password]);
        } catch (error) {
            throw error;
        }
    },
    authAcademicStaff: async (Academic_Staff_Email, Academic_Staff_Password) => {
        try {
            return await query('SELECT * FROM Academic_Staff WHERE Academic_Staff_Email = ? AND Academic_Staff_Password = ?', [Academic_Staff_Email, Academic_Staff_Password]);
        } catch (error) {
            throw error;
        }
    },
    authNonAcademicStaff: async (Non_Academic_Staff_Email, Non_Academic_Staff_Password) => {
        try {
            return await query('SELECT * FROM Non_Academic_Staff WHERE Non_Academic_Staff_Email = ? AND Non_Academic_Staff_Password = ?', [Non_Academic_Staff_Email, Non_Academic_Staff_Password]);
        } catch (error) {
            throw error;
        }
    },
}

module.exports = authModel;
