const SemesterModel = require('../models/Semester');
const { successResponse, errorResponse } = require('../utils/responseUtils');

const SemesterService = {
    sampleEndPoint: async (req, res) => {
        const receivedData = req.body;
        console.log('Received data:', receivedData);
        res.status(200).json({ message: 'Data received successfully', data: receivedData });
    },
    getAllSemesters: async (req, res) => {
        try {
            const results = await SemesterModel.getAllSemesters();
            if(results.lenght === 0) return errorResponse(res, 'No Semesters found', 404);
            successResponse(res, 'Semesters retrieved successfully', results)
        }  catch (error) {
            console.error('Error in Semesters:', error);
            errorResponse(res, 'Error Occcurred while fetching Semesters : ' + error);
        }
    },
    getSemesterById: async (req, res) => {
        const { Semester_ID } = req.params;
        try {
            const results = await SemesterModel.getSemesterById(Semester_ID);
            if(results.lenght === 0) return errorResponse(res, 'No Semester found', 404);
            successResponse(res, 'Semester retrieved successfully', results)
        }  catch (error) {
            console.error('Error in Semester:', error);
            errorResponse(res, 'Error Occcurred while fetching Semester by id : ' + error);
        }
    },
    getSemesterByName: async (req, res) => {
        const { Semester_Name } = req.params;
        try {
            const results = await SemesterModel.getSemesterByName(Semester_Name);
            if(results.lenght === 0) return errorResponse(res, 'No Semester found', 404);
            successResponse(res, 'Semester retrieved successfully', results)
        }  catch (error) {
            console.error('Error in Semester:', error);
            errorResponse(res, 'Error Occcurred while fetching Semester by name : ' + error);
        }
    },
    updateSemester: async (req, res) => {
        const { Semester_ID }   = req.params;
        const { Semester_Name } = req.body;
    
        try {
            const results = await SemesterModel.getSemesterById(Semester_ID);

            if(results.lenght === 0) 
                return errorResponse(res, 'No Semester found', 404);
            const result = await SemesterModel.updateSemester(Semester_ID, Semester_Name);

            if(result.affectedRows === 0) 
                return errorResponse(res, 'Error Occurred while updating Semester', 400);
            else if(result.affectedRows === 1) 
                affectedSemester = await SemesterModel.getSemesterById(Semester_ID);
            return successResponse(res, 'Semester updated successfully', affectedSemester[0]);
        }  catch (error) {
            console.error('Error in Semester:', error);
            errorResponse(res, 'Error Occcurred while updating Semester : ' + error);
        }
    },
    deleteSemester: async (req, res) => {
        const { Semester_ID } = req.params;
        try {
            const results = await SemesterModel.deleteSemester(Semester_ID);
            successResponse(res, 'Semester deleted successfully', results)
        }  catch (error) {
            console.error('Error in Semester:', error);
            errorResponse(res, 'Error Occcurred while deleting Semester : ' + error);
        }
    },
    addSemester: async (req, res) => {
        const { Semester_Name } = req.body;
        if(!Semester_Name) {
                return errorResponse(res, 'Semester Name is required', 400);
        }

        let affectedSemester;
       try {
       
            // const semesterResults = await SemesterModel.getSemesterByName(Semester_Name);

            // if(semesterResults.lenght !== 0) 
            //     return errorResponse(res, 'Semester already exists', 400);

            // const Semester_ID = Math.floor(Math.random() * 1000000000);
            const result = await SemesterModel.addSemester(Semester_Name, Semester_ID);
            
            if(result.affectedRows === 0) 
                return errorResponse(res, 'Error adding Semester', 400);
            else if(result.affectedRows === 1) 
                affectedSemester = await SemesterModel.getSemesterById(Semester_ID);
            return successResponse(res, 'Semester added successfully', affectedSemester[0]);
        }  catch (error) {
            console.error('Error in Semester:', error);
            errorResponse(res, 'Error Occcurred while adding Semester : ' + error);
        }
    }
};

module.exports = SemesterService;