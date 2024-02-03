const CourseModel = require('../models/Course');
const { successResponse, errorResponse } = require('../utils/responseUtils');

const CourseService = {
    sampleEndPoint: async (req, res) => {
        const receivedData = req.body;
        console.log('Received data:', receivedData);
        res.status(200).json({ message: 'Data received successfully', data: receivedData });
    },
    getAllCourses: async (req, res) => {
        try {
            const results = await CourseModel.getAllCourses();
            if(results.lenght === 0) return errorResponse(res, 'No Courses found', 404);
            successResponse(res, 'Courses retrieved successfully', results)
        }  catch (error) {
            console.error('Error in Courses:', error);
            errorResponse(res, 'Error Occcurred while fetching Courses : ' + error);
        }
    },
    getCourseById: async (req, res) => {
        const { Course_ID } = req.params;
        try {
            const results = await CourseModel.getCourseById(Course_ID);
            if(results.lenght === 0) return errorResponse(res, 'No Course found', 404);
            successResponse(res, 'Course retrieved successfully', results)
        }  catch (error) {
            console.error('Error in Course:', error);
            errorResponse(res, 'Error Occcurred while fetching Course by id : ' + error);
        }
    },
    getCourseByCode: async (req, res) => {
        const { Course_Code } = req.params;
        try {
            const results = await CourseModel.getCourseByCode(Course_Code);
            if(results.lenght === 0) return errorResponse(res, 'No Course found', 404);
            successResponse(res, 'Course retrieved successfully', results)
        }  catch (error) {
            console.error('Error in Course:', error);
            errorResponse(res, 'Error Occcurred while fetching Course by code : ' + error);
        }
    },
    getCourseByName: async (req, res) => {
        const { Course_Name } = req.params;
        try {
            const results = await CourseModel.getCourseByName(Course_Name);
            if(results.lenght === 0) return errorResponse(res, 'No Course found', 404);
            successResponse(res, 'Course retrieved successfully', results)
        }  catch (error) {
            console.error('Error in Course:', error);
            errorResponse(res, 'Error Occcurred while fetching Course by name : ' + error);
        }
    },
    getCourseByLecturer: async (req, res) => {
        const { Lecturer_ID } = req.params;
        try {
            const results = await CourseModel.getCourseByLecturer(Lecturer_ID);
            if(results.lenght === 0) return errorResponse(res, 'No Course found', 404);
            successResponse(res, 'Course retrieved successfully', results)
        }  catch (error) {
            console.error('Error in Course:', error);
            errorResponse(res, 'Error Occcurred while fetching Course by lecturer : ' + error);
        }
    },
    addCourse: async (req, res) => {
        const {Course_Name, Course_Code, Lecturer_ID} = req.body;
        if(!Course_Name || !Course_Code || !Lecturer_ID){
            return errorResponse(res, 'Course_Name, Course_Code and Lecturer_ID are required fields', 400);
        }

        let affectedCourse;
        try {
            const codeResults = await CourseModel.getCourseByCode(Course_Code);

            if(codeResults.length !== 0)
                return errorResponse(res, 'Course with that code already exists', 409);
            
            const Course_ID = Math.floor(Math.random() * 1000000000);
            const result = await CourseModel.addCourse(Course_ID, Course_Name, Course_Code, Lecturer_ID);

            if(result.affectedRows === 0)
                return errorResponse(res, 'Error adding Course', 400);
            else if(result.affectedRows === 1)
                affectedCourse = await CourseModel.getCourseById(Course_ID);
            return successResponse(res, 'Course added successfully', affectedCourse);
        } catch (error) {
            console.error('Error adding Course:', error);
            errorResponse(res, 'Error Occcurred while adding Course : ' + error);
        }
    },
    updateCourse: async (req, res) => {
        const {Course_ID} = req.params;
        const {
            Course_Name, 
            Course_Code, 
            Lecturer_ID
        } = req.body;
       
        try {
            const results = await CourseModel.getCourseById(Course_ID);

            if(results.length === 0)
                return errorResponse(res, 'Course with that id does not exists', 404);
            const result = await CourseModel.updateCourse(Course_ID, Course_Name, Course_Code, Lecturer_ID);

            if(result.affectedRows === 0)
                return errorResponse(res, 'Error updating Course', 400);
            else if(result.affectedRows === 1)
                affectedCourse = await CourseModel.getCourseById(Course_ID);
            return successResponse(res, 'Course updated successfully', affectedCourse[0]);
        } catch (error) {
            console.error('Error updating Course:', error);
            errorResponse(res, 'Error Occcurred while updating Course : ' + error);
        }
    },
    deleteCourse: async (req, res) => {
        const {Course_ID} = req.params;
        try {
            const results = await CourseModel.getCourseById(Course_ID);

            if(results.length === 0)
                return errorResponse(res, 'Course with that code already exists', 409);
            
            const result = await CourseModel.deleteCourse(Course_ID);

            if(result.affectedRows === 0)
                return errorResponse(res, 'Error deleting Course', 400);
            else if(result.affectedRows === 1)
                affectedCourse = await CourseModel.getCourseById(Course_ID);
            return successResponse(res, 'Course deleted successfully', affectedCourse);
        } catch (error) {
            console.error('Error deleting Course:', error);
            errorResponse(res, 'Error Occcurred while deleting Course : ' + error);
        }
    }

};

module.exports = CourseService;