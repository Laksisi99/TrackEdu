const LecturerModel = require('../models/Lecturer');
const { successResponse, errorResponse } = require('../utils/responseUtils');
const {hashPassword} = require('../utils/bcrypt');

const LecturerService = {
    sampleEndPoint: async (req, res) => {
        const receivedData = req.body;
        console.log('Received data:', receivedData);
        res.status(200).json({ message: 'Data received successfully', data: receivedData });
    },
    getAllLecturers: async (req, res) => {
        try {
            const results = await LecturerModel.getAllLecturers();
            if(results.lenght === 0) return errorResponse(res, 'No Lecturers found', 404);
            successResponse(res, 'Lecturers retrieved successfully', results)
        }  catch (error) {
            console.error('Error in Lecturers:', error);
            errorResponse(res, 'Error Occcurred while fetching Lecturers : ' + error);
        }
    },
    getLecturerById: async (req, res) => {
        const { Lecturer_ID } = req.params;
        try {
            const results = await LecturerModel.getLecturerById(Lecturer_ID);
            if(results.lenght === 0) return errorResponse(res, 'No Lecturer found', 404);
            successResponse(res, 'Lecturer retrieved successfully', results)
        }  catch (error) {
            console.error('Error in Lecturer:', error);
            errorResponse(res, 'Error Occcurred while fetching Lecturer by id : ' + error);
        }
    },
    getLecturerByEmail: async (req, res) => {
        const { Lecturer_Email } = req.params;
        try {
            const results = await LecturerModel.getLecturerByEmail(Lecturer_Email);
            if(results.lenght === 0) return errorResponse(res, 'No Lecturer found', 404);
            successResponse(res, 'Lecturer retrieved successfully', results)
        }  catch (error) {
            console.error('Error in Lecturer:', error);
            errorResponse(res, 'Error Occcurred while fetching Lecturer by email : ' + error);
        }
    },
    getLecturerByName: async (req, res) => {
        const { Lecturer_Name } = req.params;
        try {
            const results = await LecturerModel.getLecturerByName(Lecturer_Name);
            if(results.lenght === 0) return errorResponse(res, 'No Lecturer found', 404);
            successResponse(res, 'Lecturer retrieved successfully', results)
        }  catch (error) {
            console.error('Error in Lecturer:', error);
            errorResponse(res, 'Error Occcurred while fetching Lecturer by name : ' + error);
        }
    },
    addLecturer : async (req, res) => {
        const {Lecturer_Name, Lecturer_Email, Lecturer_Contact_Number, Lecturer_NIC, Lecturer_Password} = req.body;
        if(!Lecturer_Name || !Lecturer_Email || !Lecturer_Contact_Number || !Lecturer_NIC || !Lecturer_Password){
            return errorResponse(res, 'Lecturer_Name, Lecturer_Email, Lecturer_Contact_Number, Lecturer_NIC and Lecturer_Password are required fields', 400);
        }

        let affectedLecturer;
        try {
            const emailResults = await LecturerModel.getLecturerByEmail(Lecturer_Email);

            if(emailResults.length !== 0)
                return errorResponse(res, 'Lecturer with this email already exists', 400);

            const Lecturer_ID = Math.floor(Math.random() * 1000000000);
            const hashedPassword = await hashPassword(Lecturer_Password);
            const result = await LecturerModel.addLecturer(Lecturer_ID, Lecturer_Name, Lecturer_Email, Lecturer_Contact_Number, Lecturer_NIC, hashedPassword);

            if(result.affectedRows === 0)
                return errorResponse(res, 'Error adding Lecturer', 500);
            else if(result.affectedRows === 1)
                affectedLecturer = await LecturerModel.getLecturerById(Lecturer_ID);
            return successResponse(res, 'Lecturer added successfully', affectedLecturer[0]);
        } catch (error) {
            console.error('Error adding Lecturer:', error);
            errorResponse(res, 'Error Occurred while adding Lecturer : ' + error);
        }
    },
    updateLecturer: async (req, res) => {
        const {Lecturer_ID} = req.params;
        const {
            Lecturer_Name,
            Lecturer_Email,
            Lecturer_Contact_Number,
            Lecturer_NIC,
            Lecturer_Password
        } = req.body;
        try {
            const results = await LecturerModel.updateLecturer(Lecturer_ID, Lecturer_Name, Lecturer_Email, Lecturer_Contact_Number, Lecturer_NIC, Lecturer_Password);
            if(results.affectedRows === 0) return errorResponse(res, 'No Lecturer found', 404);
            successResponse(res, 'Lecturer updated successfully');
        } catch (error) {
            console.error('Error in Lecturer:', error);
            errorResponse(res, 'Error Occcurred while updating Lecturer : ' + error);
        }
    },
    deleteLecturer: async (req, res) => {
        const { Lecturer_ID } = req.params;
        try {
            const results = await LecturerModel.deleteLecturer(Lecturer_ID);
            if(results.affectedRows === 0) return errorResponse(res, 'No Lecturer found', 404);
            successResponse(res, 'Lecturer deleted successfully');
        } catch (error) {
            console.error('Error in Lecturer:', error);
            errorResponse(res, 'Error Occcurred while deleting Lecturer : ' + error);
        }
    }
};

module.exports = LecturerService;