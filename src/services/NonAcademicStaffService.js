// -- Table for Non Academic Staff
// CREATE TABLE Non_Academic_Staff (
//     Non_Academic_Staff_ID INT PRIMARY KEY AUTO_INCREMENT,
//     Non_Academic_Staff_Name VARCHAR(50) NOT NULL,
//     Non_Academic_Staff_Email VARCHAR(100) UNIQUE NOT NULL,
//     Non_Academic_Staff_Contact_Number VARCHAR(15),
//     Non_Academic_Staff_NIC VARCHAR(15) UNIQUE NOT NULL,
//     Non_Academic_Staff_Password VARCHAR(100) NOT NULL,
//     Club_ID INT,
//     FOREIGN KEY (Club_ID) REFERENCES Clubs(Club_ID)
// );

const NonAcademicStaffModel = require('../models/NonAcademicStaff');
const { successResponse, errorResponse } = require('../utils/responseUtils');
const {hashPassword} = require('../utils/bcrypt');

const NonAcademicStaffService = {
    sampleEndpoint: async (req, res) => {
        const receivedData = req.body;
        console.log('Received data:', receivedData);
        res.status(200).json({ message: 'Data received successfully', data: receivedData });
    },
    getAllNonAcademicStaff: async (req, res) => {
        try {
            const results = await NonAcademicStaffModel.getAllNonAcademicStaff();
            if(results.lenght === 0) return errorResponse(res, 'No Non Academic Staff found', 404);
            successResponse(res, 'Non Academic Staff retrieved successfully', results)
        }  catch (error) {
            console.error('Error in Non Academic Staff:', error);
            errorResponse(res, 'Error Occcurred while fetching Non Academic Staff : ' + error);
        }
    },
    getNonAcademicStaffById: async (req, res) => {
        const { Non_Academic_Staff_ID } = req.params;
        try {
            const results = await NonAcademicStaffModel.getNonAcademicStaffById(Non_Academic_Staff_ID);
            if(results.lenght === 0) return errorResponse(res, 'No Non Academic Staff found', 404);
            successResponse(res, 'Non Academic Staff retrieved successfully', results)
        }  catch (error) {
            console.error('Error in Non Academic Staff:', error);
            errorResponse(res, 'Error Occcurred while fetching Non Academic Staff by id : ' + error);
        }
    },
    getNonAcademicStaffByEmail: async (req, res) => {
        const { Non_Academic_Staff_Email } = req.params;
        try {
            const results = await NonAcademicStaffModel.getNonAcademicStaffByEmail(Non_Academic_Staff_Email);
            if(results.lenght === 0) return errorResponse(res, 'No Non Academic Staff found', 404);
            successResponse(res, 'Non Academic Staff retrieved successfully', results)
        }  catch (error) {
            console.error('Error in Non Academic Staff:', error);
            errorResponse(res, 'Error Occcurred while fetching Non Academic Staff by email : ' + error);
        }
    },
    getNonAcademicStaffByName: async (req, res) => {
        const { Non_Academic_Staff_Name } = req.params;
        try {
            const results = await NonAcademicStaffModel.getNonAcademicStaffByName(Non_Academic_Staff_Name);
            if(results.lenght === 0) return errorResponse(res, 'No Non Academic Staff found', 404);
            successResponse(res, 'Non Academic Staff retrieved successfully', results)
        }  catch (error) {
            console.error('Error in Non Academic Staff:', error);
            errorResponse(res, 'Error Occcurred while fetching Non Academic Staff by name : ' + error);
        }
    },
    getNonAcademicStaffByNIC: async (req, res) => {
        const { Non_Academic_Staff_NIC } = req.params;
        try {
            const results = await NonAcademicStaffModel.getNonAcademicStaffByNIC(Non_Academic_Staff_NIC);
            if(results.lenght === 0) return errorResponse(res, 'No Non Academic Staff found', 404);
            successResponse(res, 'Non Academic Staff retrieved successfully', results)
        }  catch (error) {
            console.error('Error in Non Academic Staff:', error);
            errorResponse(res, 'Error Occcurred while fetching Non Academic Staff by NIC : ' + error);
        }
    },
    getNonAcademicStaffClubID: async (req, res) => {
        const { Club_ID } = req.params;
        try {
            const results = await NonAcademicStaffModel.getNonAcademicStaffClubID(Club_ID);
            if(results.lenght === 0) return errorResponse(res, 'No Non Academic Staff found', 404);
            successResponse(res, 'Non Academic Staff retrieved successfully', results)
        }  catch (error) {
            console.error('Error in Non Academic Staff:', error);
            errorResponse(res, 'Error Occcurred while fetching Non Academic Staff by club id : ' + error);
        }
    },
    addNonAcademicStaff: async (req, res) => {
        const { Non_Academic_Staff_Name, Non_Academic_Staff_Email, Non_Academic_Staff_Contact_Number, Non_Academic_Staff_NIC, Non_Academic_Staff_Password, Club_ID } = req.body;
        if(!Non_Academic_Staff_Name || !Non_Academic_Staff_Email || !Non_Academic_Staff_Contact_Number || !Non_Academic_Staff_NIC || !Non_Academic_Staff_Password || !Club_ID) {
            return errorResponse(res, 'Insufficient details', 400);
        }

        let affectedNonAcademicStaff;

        try {
            const emailResults = await NonAcademicStaffModel.getNonAcademicStaffByEmail(Non_Academic_Staff_Email);

            if(emailResults.length !== 0)
                return errorResponse(res, 'Non Academic Staff already exists', 409);

            const Non_Academic_Staff_ID = Math.floor(Math.random() * 1000000);
            const hashedPassword = await hashPassword(Non_Academic_Staff_Password);
            const results = await NonAcademicStaffModel.addNonAcademicStaff(Non_Academic_Staff_ID, Non_Academic_Staff_Name, Non_Academic_Staff_Email, Non_Academic_Staff_Contact_Number, Non_Academic_Staff_NIC, hashedPassword, Club_ID);

            if(results.affectedRows === 0) 
                return errorResponse(res, 'Adding Non Academic Staff failed', 500);
            else if(results.affectedRows === 1)
                affectedNonAcademicStaff = await NonAcademicStaffModel.getNonAcademicStaffById(Non_Academic_Staff_ID);
            return successResponse(res, 'Non Academic Staff added successfully', affectedNonAcademicStaff);
        } catch (error) {
            console.error('Error in adding Non Academic Staff:', error);
            errorResponse(res, 'Error in adding Non Academic Staff: ' + error);
        }
    },
    updateNonAcademicStaff: async (req, res) => {
        const { Non_Academic_Staff_ID } = req.params;
        const { 
            Non_Academic_Staff_Name, 
            Non_Academic_Staff_Email, 
            Non_Academic_Staff_Contact_Number, 
            Non_Academic_Staff_NIC, 
            Non_Academic_Staff_Password,
            Club_ID
        } = req.body;
       
        try {
            const hashedPassword = await hashPassword(Non_Academic_Staff_Password);
            const results = await NonAcademicStaffModel.updateNonAcademicStaff(Non_Academic_Staff_ID, Non_Academic_Staff_Name, Non_Academic_Staff_Email, Non_Academic_Staff_Contact_Number, Non_Academic_Staff_NIC, hashedPassword, Club_ID);
            if(results.affectedRows === 0)
                return errorResponse(res, 'Updating Non Academic Staff failed', 500);
            else if(results.affectedRows === 1)
                affectedNonAcademicStaff = await NonAcademicStaffModel.getNonAcademicStaffById(Non_Academic_Staff_ID);
            successResponse(res, 'Non Academic Staff updated successfully', results);
        } catch (error) {
            console.error('Error in updating Non Academic Staff:', error);
            errorResponse(res, 'Error in updating Non Academic Staff: ' + error);
        }
    },
    deleteNonAcademicStaff: async (req, res) => {
        const { Non_Academic_Staff_ID } = req.params;
        try {
            const results = await NonAcademicStaffModel.deleteNonAcademicStaff(Non_Academic_Staff_ID);
            successResponse(res, 'Non Academic Staff deleted successfully', results);
        } catch (error) {
            console.error('Error in deleting Non Academic Staff:', error);
            errorResponse(res, 'Error in deleting Non Academic Staff: ' + error);
        }
    }
};

module.exports = NonAcademicStaffService;