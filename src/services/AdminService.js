const AdminModel = require('../models/Admin');
const { successResponse, errorResponse } = require('../utils/responseUtils');
const {hashPassword} = require('../utils/bcrypt');

const AdminService = {
    sampleEndPoint: async (req, res) => {
        const receivedData = req.body;
        console.log('Received data:', receivedData);
        res.status(200).json({ message: 'Data received successfully', data: receivedData });
    },
    getAllAdmins: async (req, res) => {
        try {
            const results = await AdminModel.getAllAdmins();
            if(results.lenght === 0) return errorResponse(res, 'No Admins found', 404);
            successResponse(res, 'Admins retrieved successfully', results)
        }  catch (error) {
            console.error('Error in Admins:', error);
            errorResponse(res, 'Error Occcurred while fetching Admins : ' + error);
        }
    },
    getAdminByEmail: async (req, res) => {
        const { Admin_Email } = req.params;
        try {
            const results = await AdminModel.getAdminByEmail(Admin_Email);
            if(results.lenght === 0) return errorResponse(res, 'No Admin found', 404);
            successResponse(res, 'Admin retrieved successfully', results)
        }  catch (error) {
            console.error('Error in Admin:', error);
            errorResponse(res, 'Error Occcurred while fetching Admin by email : ' + error);
        }
    },
    addAdmin : async (req, res) => {
        const {Admin_Name, Admin_Email, Admin_Password} = req.body;
        if(!Admin_Name || !Admin_Email || !Admin_Password){
            return errorResponse(res, 'Admin_Name, Admin_Email and Admin_Password are required fields', 400);
        }

        let affectedAdmin;
        try {
            const emailResults = await AdminModel.getAdminByEmail(Admin_Email);

            if(emailResults.length !== 0)
                return errorResponse(res, 'Admin with this email already exists', 400);

            const Admin_ID = Math.floor(Math.random() * 1000000000);
            const hashedPassword = await hashPassword(Admin_Password);
            const result = await AdminModel.addAdmin(Admin_ID, Admin_Name, Admin_Email, hashedPassword);

            if(result.affectedRows === 0)
                return errorResponse(res, 'Error adding Admin', 500);
            else if(result.affectedRows === 1)
                affectedAdmin = await AdminModel.getAdminById(Admin_ID);
            return successResponse(res, 'Admin added successfully', affectedAdmin[0]);
        } catch (error) {
            console.error('Error adding Admin:', error);
            errorResponse(res, 'Error Occurred while adding Admin : ' + error);
        }
    },
    
    getAdminById: async (req, res) => {
        const { Admin_ID } = req.params;
        try {
            const results = await AdminModel.getAdminById(Admin_ID);
            if(results.lenght === 0) return errorResponse(res, 'No Admin found', 404);
            successResponse(res, 'Admin retrieved successfully', results)
        }  catch (error) {
            console.error('Error in Admin:', error);
            errorResponse(res, 'Error Occcurred while fetching Admin by id : ' + error);
        }
    },
    updateAdmin: async (req, res) => {
        const {Admin_ID} = req.params;
        const {
            Admin_Name,
            Admin_Email,
            Admin_Password
        } = req.body;
        try {
            const result = await AdminModel.updateAdmin(Admin_ID, Admin_Name, Admin_Email, Admin_Password);
            successResponse(res, 'Admin updated successfully', result);
        }catch (error) {
            console.error('Error in updating Admin:', error);
            errorResponse(res, 'Error Occcurred while updating Admin : ' + error);
        }
    },
    deleteAdmin: async (req, res) => {
        const {Admin_ID} = req.params;
        try {
            const result = await AdminModel.deleteAdmin(Admin_ID);
            successResponse(res, 'Admin deleted successfully', result);
        }catch (error) {
            console.error('Error in deleting Admin:', error);
            errorResponse(res, 'Error Occcurred while deleting Admin : ' + error);
        }
    }
};

module.exports = AdminService;