const { query } = require('../config/database');

const AcademicStaffModel = {
    getAllAcademicStaff: async () => {
        try {
            return await query('SELECT * FROM Academic_Staff');
        } catch (error) {
            throw error;
        }
    },
    addAcademicStaff: async (Academic_Staff_ID, Academic_Staff_Name, Academic_Staff_Email, Academic_Staff_Contact_Number, Academic_Staff_NIC, Academic_Staff_Password) => {
        try {
            const results = await query('INSERT INTO Academic_Staff (Academic_Staff_ID, Academic_Staff_Name, Academic_Staff_Email, Academic_Staff_Contact_Number, Academic_Staff_NIC, Academic_Staff_Password) ' +
                'VALUES (?, ?, ?, ?, ?, ?)', [Academic_Staff_ID, Academic_Staff_Name, Academic_Staff_Email, Academic_Staff_Contact_Number, Academic_Staff_NIC, Academic_Staff_Password]);
            return results;
        } catch (error) {
            throw error;
        }
    },
    getAcademicStaffById: async (Academic_Staff_ID) => {
        try {
            const results = await query('SELECT * FROM Academic_Staff WHERE Academic_Staff_Id = ?', [Academic_Staff_ID]);
            return results;
        } catch (error) {
            throw error;
        }
    },
    getAcademicStaffByEmail: async (Academic_Staff_Email) => {
        try {
            const results = await query('SELECT * FROM Academic_Staff WHERE Academic_Staff_Email = ?', [Academic_Staff_Email]);
            return results;
        } catch (error) {
            throw error;
        }
    },
    getAcademicStaffByName: async (Academic_Staff_Name) => {
        try {
            const results = await query('SELECT * FROM Academic_Staff WHERE Academic_Staff_Name = ?', [Academic_Staff_Name]);
            return results;
        } catch (error) {
            throw error;
        }
    },
    getAcademicStaffByNIC: async (Academic_Staff_NIC) => {
        try {
            const results = await query('SELECT * FROM Academic_Staff WHERE Academic_Staff_NIC = ?', [Academic_Staff_NIC]);
            return results;
        } catch (error) {
            throw error;
        }
    },
    updateAcademicStaff: async (Academic_Staff_ID, Academic_Staff_Name, Academic_Staff_Email, Academic_Staff_Contact_Number, Academic_Staff_NIC, Academic_Staff_Password) => {
        try {
            const results = await query('UPDATE Academic_Staff SET Academic_Staff_Name = ?, Academic_Staff_Email = ?, Academic_Staff_Contact_Number = ?, Academic_Staff_NIC = ?, Academic_Staff_Password = ? WHERE Academic_Staff_ID = ?', [Academic_Staff_Name, Academic_Staff_Email, Academic_Staff_Contact_Number, Academic_Staff_NIC, Academic_Staff_Password, Academic_Staff_ID]);
            return results;
        } catch (error) {
            throw error;
        }
    },
    deleteAcademicStaff: async (Academic_Staff_ID) => {
        try {
            const results = await query('DELETE FROM Academic_Staff WHERE Academic_Staff_ID = ?', [Academic_Staff_ID]);
            return results;
        } catch (error) {
            throw error;
        }
    }
};

module.exports = AcademicStaffModel;
