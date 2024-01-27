const AcademicStaffModel = require('../models/AcademicStaff');
const { successResponse, errorResponse } = require('../utils/responseUtils');
const {hashPassword} = require('../utils/bcrypt');

const AcademicStaffService = {
    sampleEndpoint: async (req, res) => {
        const receivedData = req.body;
        console.log('Received data:', receivedData);
        res.status(200).json({ message: 'Data received successfully', data: receivedData });
    },
    getAllAcademicStaff: async (req, res) => {
        try {
            const results = await AcademicStaffModel.getAllAcademicStaff();
            if(results.lenght === 0) return errorResponse(res, 'No Academic Staff found', 404);
            successResponse(res, 'Academic Staff retrieved successfully', results)
        }  catch (error) {
            console.error('Error in Academic Staff:', error);
            errorResponse(res, 'Error Occcurred while fetching Academic Staff : ' + error);
        }
    },
    getAcademicStaffById: async (req, res) => {
        const { Academic_Staff_ID } = req.params;
        try {
            const results = await AcademicStaffModel.getAcademicStaffById(Academic_Staff_ID);
            if(results.lenght === 0) return errorResponse(res, 'No Academic Staff found', 404);
            successResponse(res, 'Academic Staff retrieved successfully', results)
        }  catch (error) {
            console.error('Error in Academic Staff:', error);
            errorResponse(res, 'Error Occcurred while fetching Academic Staff by id : ' + error);
        }
    },
    getAcademicStaffByEmail: async (req, res) => {
        const { Academic_Staff_Email } = req.params;
        try {
            const results = await AcademicStaffModel.getAcademicStaffByEmail(Academic_Staff_Email);
            if(results.lenght === 0) return errorResponse(res, 'No Academic Staff found', 404);
            successResponse(res, 'Academic Staff retrieved successfully', results)
        }  catch (error) {
            console.error('Error in Academic Staff:', error);
            errorResponse(res, 'Error Occcurred while fetching Academic Staff by email : ' + error);
        }
    },
    getAcademicStaffByName: async (req, res) => {
        const { Academic_Staff_Name } = req.params;
        try {
            const results = await AcademicStaffModel.getAcademicStaffByName(Academic_Staff_Name);
            if(results.lenght === 0) return errorResponse(res, 'No Academic Staff found', 404);
            successResponse(res, 'Academic Staff retrieved successfully', results)
        }  catch (error) {
            console.error('Error in Academic Staff:', error);
            errorResponse(res, 'Error Occcurred while fetching Academic Staff by name : ' + error);
        }
    },
    getAcademicStaffByNIC: async (req, res) => {
        const { Academic_Staff_NIC } = req.params;
        try {
            const results = await AcademicStaffModel.getAcademicStaffByNIC(Academic_Staff_NIC);
            if(results.lenght === 0) return errorResponse(res, 'No Academic Staff found', 404);
            successResponse(res, 'Academic Staff retrieved successfully', results)
        }  catch (error) {
            console.error('Error in Academic Staff:', error);
            errorResponse(res, 'Error Occcurred while fetching Academic Staff by NIC : ' + error);
        }
    },
   
    addAcademicStaff: async (req, res) => {
        const { Academic_Staff_Name, Academic_Staff_Email, Academic_Staff_Contact_Number, Academic_Staff_NIC, Academic_Staff_Password } = req.body;
        if(!Academic_Staff_Name || !Academic_Staff_Email || !Academic_Staff_Contact_Number || !Academic_Staff_NIC || !Academic_Staff_Password) {
            return errorResponse(res, 'Insufficient details', 400);
            
        }

        let affectedAcademicStaff;
        
        try {
            const emailResults = await AcademicStaffModel.getAcademicStaffByEmail(Academic_Staff_Email);

            if(emailResults.length !== 0) 
            return errorResponse(res, 'Academic Staff with this email already exists', 409);

            const Academic_Staff_ID = Math.floor(Math.random() * 1000000);
            const hashedPassword = await hashPassword(Academic_Staff_Password);
            const result = await AcademicStaffModel.addAcademicStaff(Academic_Staff_ID, Academic_Staff_Name, Academic_Staff_Email, Academic_Staff_Contact_Number, Academic_Staff_NIC, hashedPassword);

            if(result.affectedRows === 0) 
                return errorResponse(res, 'Academic Staff could not be added', 500);
            else if(result.affectedRows === 1)
                affectedAcademicStaff = await AcademicStaffModel.getAcademicStaffById(Academic_Staff_ID);
            return successResponse(res, 'Academic Staff added successfully', affectedAcademicStaff[0]);
        } catch (error) {
            console.error('Error in adding Academic Staff:', error);
            return errorResponse(res, 'Error Occcurred while adding Academic Staff : ' + error);  
        }
    },
                
    updateAcademicStaff: async (req, res) => {
        const { Academic_Staff_ID } = req.params;
        const { 
            Academic_Staff_Name, 
            Academic_Staff_Email, 
            Academic_Staff_Contact_Number, 
            Academic_Staff_NIC, 
            Academic_Staff_Password 
        } = req.body; 
        try {
            const results = await AcademicStaffModel.updateAcademicStaff(Academic_Staff_ID, Academic_Staff_Name, Academic_Staff_Email, Academic_Staff_Contact_Number, Academic_Staff_NIC, Academic_Staff_Password);
            if(results.affectedRows === 0) return errorResponse(res, 'Academic Staff could not be updated', 500);
            successResponse(res, 'Academic Staff updated successfully');
        } catch (error) {
            console.error('Error in updating Academic Staff:', error);
            errorResponse(res, 'Error Occcurred while updating Academic Staff : ' + error);  
        }
    },
   
    deleteAcademicStaff: async (req, res) => {
        const { Academic_Staff_ID } = req.params;
        try {
            const results = await AcademicStaffModel.deleteAcademicStaff(Academic_Staff_ID);
            successResponse(res, 'Academic Staff deleted successfully', results);
        } catch (error) {
            console.error('Error in deleting Academic Staff:', error);
            errorResponse(res, 'Error Occcurred while deleting Academic Staff : ' + error);
        }
    }
};

module.exports = AcademicStaffService;