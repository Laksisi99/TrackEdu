const {query} = require('../config/database');

const NonAcademicStaffModel = {
    getAllNonAcademicStaff: async () => {
        try {
            return await query('SELECT * FROM Non_Academic_Staff');
        } catch (error) {
            throw error;
        }
    },
    addNonAcademicStaff: async (Non_Academic_Staff_ID, Non_Academic_Staff_Name, Non_Academic_Staff_Email, Non_Academic_Staff_Contact_Number, Non_Academic_Staff_NIC, Non_Academic_Staff_Password, Club_ID) => {
        try {
            const results = await query('INSERT INTO Non_Academic_Staff (Non_Academic_Staff_ID, Non_Academic_Staff_Name, Non_Academic_Staff_Email, Non_Academic_Staff_Contact_Number, Non_Academic_Staff_NIC, Non_Academic_Staff_Password, Club_ID) ' +
                'VALUES (?, ?, ?, ?, ?, ?, ?)', [Non_Academic_Staff_ID, Non_Academic_Staff_Name, Non_Academic_Staff_Email, Non_Academic_Staff_Contact_Number, Non_Academic_Staff_NIC, Non_Academic_Staff_Password, Club_ID]);
            return results;
        } catch (error) {
            throw error;
        }
    },
    getNonAcademicStaffById: async (Non_Academic_Staff_ID) => {
        try {
            const results = await query('SELECT * FROM Non_Academic_Staff WHERE Non_Academic_Staff_Id = ?', [Non_Academic_Staff_ID]);
            return results;
        } catch (error) {
            throw error;
        }
    },
    getNonAcademicStaffByEmail: async (Non_Academic_Staff_Email) => {
        try {
            const results = await query('SELECT * FROM Non_Academic_Staff WHERE Non_Academic_Staff_Email = ?', [Non_Academic_Staff_Email]);
            return results;
        } catch (error) {
            throw error;
        }
    },
    getNonAcademicStaffByName: async (Non_Academic_Staff_Name) => {
        try {
            const results = await query('SELECT * FROM Non_Academic_Staff WHERE Non_Academic_Staff_Name = ?', [Non_Academic_Staff_Name]);
            return results;
        } catch (error) {
            throw error;
        }
    },
    getNonAcademicStaffByNIC: async (Non_Academic_Staff_NIC) => {
        try {
            const results = await query('SELECT * FROM Non_Academic_Staff WHERE Non_Academic_Staff_NIC = ?', [Non_Academic_Staff_NIC]);
            return results;
        } catch (error) {
            throw error;
        }
    },
    getNonAcademicStaffClubID: async (Club_ID) => {
        try {
            const results = await query('SELECT * FROM Non_Academic_Staff WHERE Club_ID = ?', [Club_ID]);
            return results;
        } catch (error) {
            throw error;
        }
    },
    updateNonAcademicStaff: async (Non_Academic_Staff_ID, Non_Academic_Staff_Name, Non_Academic_Staff_Email, Non_Academic_Staff_Contact_Number, Non_Academic_Staff_NIC, Non_Academic_Staff_Password, Club_ID) => {
        try {
            const results = await query('UPDATE Non_Academic_Staff SET Non_Academic_Staff_Name = ?, Non_Academic_Staff_Email = ?, Non_Academic_Staff_Contact_Number = ?, Non_Academic_Staff_NIC = ?, Non_Academic_Staff_Password = ?, Club_ID = ? WHERE Non_Academic_Staff_ID = ?', [Non_Academic_Staff_Name, Non_Academic_Staff_Email, Non_Academic_Staff_Contact_Number, Non_Academic_Staff_NIC, Non_Academic_Staff_Password, Club_ID, Non_Academic_Staff_ID]);
            return results;
        } catch (error) {
            throw error;
        }
    },
    deleteNonAcademicStaff: async (Non_Academic_Staff_ID) => {
        try {
            const results = await query('DELETE FROM Non_Academic_Staff WHERE Non_Academic_Staff_ID = ?', [Non_Academic_Staff_ID]);
            return results;
        } catch (error) {
            throw error;
        }
    }
};

module.exports = NonAcademicStaffModel;