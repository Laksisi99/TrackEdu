const { query } = require('../config/database');

const AdminModel = {
    getAllAdmins: async () => {
        try {
            return await query('SELECT * FROM Admin');
        } catch (error) {
            throw error;
        }
    },
    addAdmin: async (Admin_ID, Admin_Name, Admin_Email, Admin_Password) => {
        try {
            const results = await query('INSERT INTO Admin (Admin_ID, Admin_Name, Admin_Email, Admin_Password) ' +
                'VALUES (?, ?, ?, ?)', [Admin_ID, Admin_Name, Admin_Email, Admin_Password]);
            return results;
        } catch (error) {
            throw error;
        }
    },
    getAdminById: async (Admin_Id) => {
        try {
            const results = await query('SELECT * FROM Admin WHERE Admin_Id = ?', [Admin_Id]);
            return results;
        } catch (error) {
            throw error;
        }
    },
    getAdminByEmail: async (Admin_Email) => {
        try {
            const results = await query('SELECT * FROM Admin WHERE Admin_Email = ?', [Admin_Email]);
            return results;
        } catch (error) {
            throw error;
        }
    },
    getAdminByName: async (Admin_Name) => {
        try {
            const results = await query('SELECT * FROM Admin WHERE Admin_Name = ?', [Admin_Name]);
            return results;
        } catch (error) {
            throw error;
        }
    },
    
    updateAdminPassword: async (Admin_ID, Admin_Password) => {
        try {
            const results = await query('UPDATE Admin SET Admin_Password = ? WHERE Admin_ID = ?', [Admin_Password, Admin_ID]);
            return results;
        } catch (error) {
            throw error;
        }
    },
    getAdminOldPassword: async (Admin_ID) => {
        try {
            const results = await query('SELECT Admin_Password FROM Admin WHERE Admin_ID = ?', [Admin_ID]);
            return results;
        } catch (error) {
            throw error;
        }
    },
    updateAdmin: async (Admin_ID, Admin_Name, Admin_Email, Admin_Password) => {
        try {
            const results = await query('UPDATE Admin SET Admin_Name = ?, Admin_Email = ?, Admin_Password = ? WHERE Admin_ID = ?', [Admin_Name, Admin_Email, Admin_Password, Admin_ID]);
            return results;
        } catch (error) {
            throw error;
        }
    },
    deleteAdmin: async (Admin_ID) => {
        try {
            const results = await query('DELETE FROM Admin WHERE Admin_ID = ?', [Admin_ID]);
            return results;
        } catch (error) {
            throw error;
        }
    }
};

module.exports = AdminModel;