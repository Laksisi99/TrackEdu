const StudentModel = require('../models/Student');
const { successResponse, errorResponse } = require('../utils/responseUtils');
const {hashPassword} = require('../utils/bcrypt');

const StudentService = {
    sampleEndPoint: async (req, res) => {
        const receivedData = req.body;
        console.log('Received data:', receivedData);
        res.status(200).json({ message: 'Data received successfully', data: receivedData });
    },
    getAllStudents: async (req, res) => {
        try {
            const results = await StudentModel.getAllStudents();
            if(results.lenght === 0) return errorResponse(res, 'No Students found', 404);
            successResponse(res, 'Students retrieved successfully', results)
        }  catch (error) {
            console.error('Error in Students:', error);
            errorResponse(res, 'Error Occcurred while fetching Students : ' + error);
        }
    },
    getStudentById: async (req, res) => {
        const { Student_ID } = req.params;
        try {
            const results = await StudentModel.getStudentById(Student_ID);
            if(results.lenght === 0) return errorResponse(res, 'No Student found', 404);
            successResponse(res, 'Student retrieved successfully', results)
        }  catch (error) {
            console.error('Error in Student:', error);
            errorResponse(res, 'Error Occcurred while fetching Student by id : ' + error);
        }
    },
    getStudentByEmail: async (req, res) => {
        const { Student_Email } = req.params;
        try {
            const results = await StudentModel.getStudentByEmail(Student_Email);
            if(results.lenght === 0) return errorResponse(res, 'No Student found', 404);
            successResponse(res, 'Student retrieved successfully', results)
        }  catch (error) {
            console.error('Error in Student:', error);
            errorResponse(res, 'Error Occcurred while fetching Student by email : ' + error);
        }
    },
    getStudentByName: async (req, res) => {
        const { Student_Name } = req.params;
        try {
            const results = await StudentModel.getStudentByName(Student_Name);
            if(results.lenght === 0) return errorResponse(res, 'No Student found', 404);
            successResponse(res, 'Student retrieved successfully', results)
        }  catch (error) {
            console.error('Error in Student:', error);
            errorResponse(res, 'Error Occcurred while fetching Student by name : ' + error);
        }
    },
    getStudentByRegNum: async (req, res) => {
        const { Student_Reg_Num } = req.params;
        try {
            const results = await StudentModel.getStudentByRegNum(Student_Reg_Num);
            if(results.lenght === 0) return errorResponse(res, 'No Student found', 404);
            successResponse(res, 'Student retrieved successfully', results)
        }  catch (error) {
            console.error('Error in Student:', error);
            errorResponse(res, 'Error Occcurred while fetching Student by reg num : ' + error);
        }
    },
    addStudent : async (req, res) => {
        const {Student_Name, Student_Reg_Num, Student_Email, Student_Contact_Number, Student_NIC, Student_Password, Batch_ID, Club_ID} = req.body;
        if(!Student_Name || !Student_Reg_Num || !Student_Email || !Student_Contact_Number || !Student_NIC || !Student_Password || !Batch_ID || !Club_ID){
            return errorResponse(res, 'Student_Name, Student_Reg_Num, Student_Email, Student_Contact_Number, Student_NIC, Student_Password, Batch_ID and Club_ID are required fields', 400);
        }

        let affectedStudent;
        try {
            const emailResults = await StudentModel.getStudentByEmail(Student_Email);

            if(emailResults.length !== 0) 
            return errorResponse(res, 'Student with this email already exists', 409);

            const Student_ID = Math.floor(Math.random() * 1000000);
            const hashedPassword = await hashPassword(Student_Password);
            const result = await StudentModel.addStudent(Student_ID, Student_Name, Student_Reg_Num, Student_Email, Student_Contact_Number, Student_NIC, hashedPassword, Batch_ID, Club_ID);

            if(result.affectedRows === 0)
                return errorResponse(res, 'Error Occcurred while adding Student', 500);
            else if(result.affectedRows === 1)
                affectedStudent = await StudentModel.getStudentById(Student_ID);
            return successResponse(res, 'Student added successfully', affectedStudent[0]);
        } catch (error) {
            console.error('Error in adding Student:', error);
            return errorResponse(res, 'Error Occcurred while adding Student : ' + error);
        }
    },

    updateStudent: async (req, res) => {
        const {Student_ID} = req.params;
        const {Student_Name, Student_Reg_Num, Student_Email, Student_Contact_Number, Student_NIC, Student_Password, Batch_ID, Club_ID} = req.body;
        if(!Student_Name || !Student_Reg_Num || !Student_Email || !Student_Contact_Number || !Student_NIC || !Student_Password || !Batch_ID || !Club_ID){
            return errorResponse(res, 'Student_Name, Student_Reg_Num, Student_Email, Student_Contact_Number, Student_NIC, Student_Password, Batch_ID and Club_ID are required fields', 400);
        }

        let affectedStudent;
        try {
            const hashedPassword = await hashPassword(Student_Password);
            affectedStudent = await StudentModel.updateStudent(Student_ID, Student_Name, Student_Reg_Num, Student_Email, Student_Contact_Number, Student_NIC, hashedPassword, Batch_ID, Club_ID);
        } catch (error) {
            console.error('Error in updating Student:', error);
            return errorResponse(res, 'Error Occcurred while updating Student : ' + error);
        }

        if(affectedStudent.affectedRows === 1){
            successResponse(res, 'Student updated successfully', affectedStudent);
        }
    },
    deleteStudent: async (req, res) => {
        const {Student_ID} = req.params;
        try {
            const results = await StudentModel.deleteStudent(Student_ID);
            if(results.affectedRows === 0) return errorResponse(res, 'No Student found', 404);
            successResponse(res, 'Student deleted successfully');
        } catch (error) {
            console.error('Error in Student:', error);
            errorResponse(res, 'Error Occcurred while deleting Student : ' + error);
        }
    }
};

module.exports = StudentService;