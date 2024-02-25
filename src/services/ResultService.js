const ResultsModel = require('../models/Results');
const { successResponse, errorResponse } = require('../utils/responseUtils');

const ResultsService = {
    sampleEndPoint: async (req, res) => {
        const receivedData = req.body;
        console.log('Received data:', receivedData);
        res.status(200).json({ message: 'Data received successfully', data: receivedData });
    },
    getAllResults: async (req, res) => {
        try {
            const results = await ResultsModel.getAllResults();
            if(results.lenght === 0) return errorResponse(res, 'No Results found', 404);
            successResponse(res, 'Results retrieved successfully', results)
        }  catch (error) {
            console.error('Error in Results:', error);
            errorResponse(res, 'Error Occcurred while fetching Results : ' + error);
        }
    },
    getResultById: async (req, res) => {
        const { Result_ID } = req.params;
        try {
            const results = await ResultsModel.getResultById(Result_ID);
            if(results.lenght === 0) return errorResponse(res, 'No Result found', 404);
            successResponse(res, 'Result retrieved successfully', results)
        }  catch (error) {
            console.error('Error in Result:', error);
            errorResponse(res, 'Error Occcurred while fetching Result by id : ' + error);
        }
    },
    getResultByStudent: async (req, res) => {
        const { Student_ID } = req.params;
        try {
            const results = await ResultsModel.getResultByStudent(Student_ID);
            if(results.lenght === 0) return errorResponse(res, 'No Result found', 404);
            successResponse(res, 'Result retrieved successfully', results)
        }  catch (error) {
            console.error('Error in Result:', error);
            errorResponse(res, 'Error Occcurred while fetching Result by student : ' + error);
        }
    },
    getResultByCourse: async (req, res) => {
        const { Course_ID } = req.params;
        try {
            const results = await ResultsModel.getResultByCourse(Course_ID);
            if(results.lenght === 0) return errorResponse(res, 'No Result found', 404);
            successResponse(res, 'Result retrieved successfully', results)
        }  catch (error) {
            console.error('Error in Result:', error);
            errorResponse(res, 'Error Occcurred while fetching Result by course : ' + error);
        }
    },
    getResultBySemester: async (req, res) => {
        const { Semester_ID } = req.params;
        try {
            const results = await ResultsModel.getResultBySemester(Semester_ID);
            if(results.lenght === 0) return errorResponse(res, 'No Result found', 404);
            successResponse(res, 'Result retrieved successfully', results)
        }  catch (error) {
            console.error('Error in Result:', error);
            errorResponse(res, 'Error Occcurred while fetching Result by semester : ' + error);
        }
    },

    // addResult: async (Student_ID, Course_ID, Academic_Staff_ID, Lecturer_ID, Semester_ID, Assignment_1, Assignment_2, Assignment_3, Assignment_4, Assignment_5, Mid_Exam, End_Exam) => {
    //     try {
    //         // Calculate the total result based on the provided formula
    //         const total_result = 0.25 * (Assignment_1 + Assignment_2 + Assignment_3 + Assignment_4 + Assignment_5) + 0.25 * Mid_Exam + 0.50 * End_Exam;

    //         // Determine the grade based on the total result
    //         let grade;
    //         if (total_result >= 85) {
    //             grade = 'A+';
    //         } else if (total_result >= 80) {
    //             grade = 'A';
    //         } else if (total_result >= 75) {
    //             grade = 'A-';
    //         } else if (total_result >= 70) {
    //             grade = 'B+';
    //         } else if (total_result >= 65) {
    //             grade = 'B';
    //         } else if (total_result >= 60) {
    //             grade = 'B-';
    //         } else if (total_result >= 55) {
    //             grade = 'C+';
    //         } else if (total_result >= 50) {
    //             grade = 'C';
    //         } else if (total_result >= 45) {
    //             grade = 'C-';
    //         } else if (total_result >= 40) {
    //             grade = 'D+';
    //         } else if (total_result >= 35) {
    //             grade = 'D';
    //         } else {
    //             grade = 'E';
    //         }

    //         // Insert the result into the database
    //         const results = await query('INSERT INTO student_results (Student_ID, Course_ID, Academic_Staff_ID, Lecturer_ID, Semester_ID, Assignment_1, Assignment_2, Assignment_3, Assignment_4, Assignment_5, Mid_Exam, End_Exam, Total_Result, Grade) ' +
    //             'VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    //             [Student_ID, Course_ID, Academic_Staff_ID, Lecturer_ID, Semester_ID, Assignment_1, Assignment_2, Assignment_3, Assignment_4, Assignment_5, Mid_Exam, End_Exam, total_result, grade]);
    //         return results;
    //     } catch (error) {
    //         throw error;
    //     }
    // },
   
    //for student can not have same course twice 
    // I need to add total marks and grade also

    addResult: async (req, res) => {
        const {Student_ID, Batch_ID, Course_ID, Academic_Staff_ID, Lecturer_ID, Semester_ID, Assignment_1, Assignment_2, Assignment_3, Assignment_4, Assignment_5, Mid_Exam, End_Exam} = req.body;
        if(!Student_ID || !Batch_ID || !Course_ID || !Academic_Staff_ID || !Lecturer_ID || !Semester_ID || !Assignment_1 || !Assignment_2 || !Assignment_3 || !Assignment_4 || !Assignment_5 || !Mid_Exam || !End_Exam){
            return errorResponse(res, 'Student_ID, Batch_ID, Course_ID, Academic_Staff_ID, Lecturer_ID, Semester_ID, Assignment_1, Assignment_2, Assignment_3, Assignment_4, Assignment_5, Mid_Exam, End_Exam are required fields', 400);
        }

        let affectedResult;
        // Please validate that the student does not have the same course twice
        //if same student id has same course id then return error
        try {
            const results = await ResultsModel.getResultByStudentAndCourse(Student_ID, Course_ID);
            if(results.length !== 0)
                return errorResponse(res, 'Student with this course already exists', 400);

            // Calculate the total result based on the provided formula
            const total_result =  ((Assignment_1 + Assignment_2 + Assignment_3 + Assignment_4 + Assignment_5) /20) +  (Mid_Exam / 4) + (End_Exam / 2);

            // Determine the grade based on the total result
            let grade;
            if (total_result >= 85) {
                grade = 'A+';
            } else if (total_result >= 80) {
                grade = 'A';
            } else if (total_result >= 75) {
                grade = 'A-';
            } else if (total_result >= 70) {
                grade = 'B+';
            } else if (total_result >= 65) {
                grade = 'B';
            } else if (total_result >= 60) {
                grade = 'B-';
            } else if (total_result >= 55) {
                grade = 'C+';
            } else if (total_result >= 50) {
                grade = 'C';
            } else if (total_result >= 45) {
                grade = 'C-';
            } else if (total_result >= 40) {
                grade = 'D+';
            } else if (total_result >= 35) {
                grade = 'D';
            } else {
                grade = 'E';
            }

            const result = await ResultsModel.addResult(Student_ID, Batch_ID, Course_ID, Academic_Staff_ID, Lecturer_ID, Semester_ID, Assignment_1, Assignment_2, Assignment_3, Assignment_4, Assignment_5, Mid_Exam, End_Exam, total_result, grade);

            if(result.affectedRows === 0)
                return errorResponse(res, 'Error adding Result', 500);
            else if(result.affectedRows === 1)
                affectedResult = await ResultsModel.getResultById(result.insertId);
            return successResponse(res, 'Result added successfully', affectedResult[0]);
        } catch (error) {
            console.error('Error adding Result:', error);
            errorResponse(res, 'Error Occurred while adding Result : ' + error);
        }

    },

    updateResult: async (req, res) => {
        const {Result_ID} = req.params;
        const {
            Academic_Staff_ID,
            Semester_ID,
            Assignment_1,
            Assignment_2,
            Assignment_3,
            Assignment_4,
            Assignment_5,
            Mid_Exam,
            End_Exam
        } = req.body;
        try {
            const results = await ResultsModel.getResultById(Result_ID);
            if(results.length === 0)
                return errorResponse(res, 'Result with this id does not exist', 404);

            // Calculate the total result based on the provided formula
            const total_result =  ((Assignment_1 + Assignment_2 + Assignment_3 + Assignment_4 + Assignment_5) /20) +  (Mid_Exam / 4) + (End_Exam / 2);
            
            // Determine the grade based on the total result
            let grade;
            if (total_result >= 85) {
                grade = 'A+';
            } else if (total_result >= 80) {
                grade = 'A';
            } else if (total_result >= 75) {
                grade = 'A-';
            } else if (total_result >= 70) {
                grade = 'B+';
            } else if (total_result >= 65) {
                grade = 'B';
            } else if (total_result >= 60) {
                grade = 'B-';
            } else if (total_result >= 55) {
                grade = 'C+';
            } else if (total_result >= 50) {
                grade = 'C';
            } else if (total_result >= 45) {
                grade = 'C-';
            } else if (total_result >= 40) {
                grade = 'D+';
            } else if (total_result >= 35) {
                grade = 'D';
            } else {
                grade = 'E';
            }

            const result = await ResultsModel.updateResult(Result_ID, Student_ID, Batch_ID, Course_ID, Academic_Staff_ID, Lecturer_ID, Semester_ID, Assignment_1, Assignment_2, Assignment_3, Assignment_4, Assignment_5, Mid_Exam, End_Exam, total_result, grade);
            if(result.affectedRows === 0)
                return errorResponse(res, 'Error updating Result', 500);
            else if(result.affectedRows === 1)
                affectedResult = await ResultsModel.getResultById(Result_ID);
            return successResponse(res, 'Result updated successfully', affectedResult[0]);
        } catch (error) {
            console.error('Error updating Result:', error);
            errorResponse(res, 'Error Occurred while updating Result : ' + error);
        }
    },


    getResultByStudentAndCourse: async (req, res) => {
        const {Student_ID, Course_ID} = req.params;
        try {
            const results = await ResultsModel.getResultByStudentAndCourse(Student_ID, Course_ID);
            if(results.lenght === 0) return errorResponse(res, 'No Result found', 404);
            successResponse(res, 'Result retrieved successfully', results)
        }  catch (error) {
            console.error('Error in Result:', error);
            errorResponse(res, 'Error Occcurred while fetching Result by student and course : ' + error);
        }
    },

    getResultByStudentAndSemester: async (req, res) => {
        const {Student_ID, Semester_ID} = req.params;
        try {
            const results = await ResultsModel.getResultStudentAndSemester(Student_ID, Semester_ID);
            if(results.lenght === 0) return errorResponse(res, 'No Result found', 404);
            successResponse(res, 'Result retrieved successfully', results)
        }  catch (error) {
            console.error('Error in Result:', error);
            errorResponse(res, 'Error Occcurred while fetching Result by student and semester : ' + error);
        }
    },

    getResultByCourseAndSemester: async (req, res) => {
        const {Course_ID, Semester_ID} = req.params;
        try {
            const results = await ResultsModel.getResultByCourseAndSemester(Course_ID, Semester_ID);
            if(results.lenght === 0) return errorResponse(res, 'No Result found', 404);
            successResponse(res, 'Result retrieved successfully', results)
        }  catch (error) {
            console.error('Error in Result:', error);
            errorResponse(res, 'Error Occcurred while fetching Result by course and semester : ' + error);
        }
    },

    getResultByStudentAndCourseAndSemester: async (req, res) => {
        const {Student_ID, Course_ID, Semester_ID} = req.params;
        try {
            const results = await ResultsModel.getResultByStudentAndCourseAndSemester(Student_ID, Course_ID, Semester_ID);
            if(results.lenght === 0) return errorResponse(res, 'No Result found', 404);
            successResponse(res, 'Result retrieved successfully', results)
        }  catch (error) {
            console.error('Error in Result:', error);
            errorResponse(res, 'Error Occcurred while fetching Result by student, course and semester : ' + error);
        }
    },

    getResultByBatch: async (req, res) => {
        const {Batch_ID} = req.params;
        try {
            const results = await ResultsModel.getResultByBatch(Batch_ID);
            if(results.lenght === 0) return errorResponse(res, 'No Result found', 404);
            successResponse(res, 'Result retrieved successfully', results)
        }  catch (error) {
            console.error('Error in Result:', error);
            errorResponse(res, 'Error Occcurred while fetching Result by batch id : ' + error);
        }
    },

    getResultByBatchAndCourse: async (req, res) => {
        const {Batch_ID, Course_ID} = req.params;
        try {
            const results = await ResultsModel.getResultByBatchAndCourse(Batch_ID, Course_ID);
            if(results.lenght === 0) return errorResponse(res, 'No Result found', 404);
            successResponse(res, 'Result retrieved successfully', results)
        }  catch (error) {
            console.error('Error in Result:', error);
            errorResponse(res, 'Error Occcurred while fetching Result by batch and course : ' + error);
        }
    },


    getResultByBatchAndCourseAndStudent: async (req, res) => {
        const {Batch_ID, Course_ID, Student_ID} = req.params;
        try {
            const results = await ResultsModel.getResultByBatchAndCourseAndStudent(Batch_ID, Course_ID, Student_ID);
            if(results.lenght === 0) return errorResponse(res, 'No Result found', 404);
            successResponse(res, 'Result retrieved successfully', results)
        }  catch (error) {
            console.error('Error in Result:', error);
            errorResponse(res, 'Error Occcurred while fetching Result by batch, course and student : ' + error);
        }
    },

    getResultByBatchAndSemester: async (req, res) => {
        const {Batch_ID, Semester_ID} = req.params;
        try {
            const results = await ResultsModel.getResultByBatchAndSemester(Batch_ID, Semester_ID);
            if(results.lenght === 0) return errorResponse(res, 'No Result found', 404);
            successResponse(res, 'Result retrieved successfully', results)
        }  catch (error) {
            console.error('Error in Result:', error);
            errorResponse(res, 'Error Occcurred while fetching Result by batch and semester : ' + error);
        }
    },

    getResultByBatchAndCourseAndSemester: async (req, res) => {
        const {Batch_ID, Course_ID, Semester_ID} = req.params;
        try {
            const results = await ResultsModel.getResultByBatchAndCourseAndSemester(Batch_ID, Course_ID, Semester_ID);
            if(results.lenght === 0) return errorResponse(res, 'No Result found', 404);
            successResponse(res, 'Result retrieved successfully', results)
        }  catch (error) {
            console.error('Error in Result:', error);
            errorResponse(res, 'Error Occcurred while fetching Result by batch, course and semester : ' + error);
        }
    },

    getResultByBatchAndCourseAndSemesterAndStudent: async (req, res) => {
        const {Batch_ID, Course_ID, Semester_ID, Student_ID} = req.params;
        try {
            const results = await ResultsModel.getResultByBatchAndCourseAndSemesterAndStudent(Batch_ID, Course_ID, Semester_ID, Student_ID);
            if(results.lenght === 0) return errorResponse(res, 'No Result found', 404);
            successResponse(res, 'Result retrieved successfully', results)
        }  catch (error) {
            console.error('Error in Result:', error);
            errorResponse(res, 'Error Occcurred while fetching Result by batch, course, semester and student : ' + error);
        }
    },

    getResultByBatchAndStudent: async (req, res) => {
        const {Batch_ID, Student_ID} = req.params;
        try {
            const results = await ResultsModel.getResultByBatchAndStudent(Batch_ID, Student_ID);
            if(results.lenght === 0) return errorResponse(res, 'No Result found', 404);
            successResponse(res, 'Result retrieved successfully', results)
        }  catch (error) {
            console.error('Error in Result:', error);
            errorResponse(res, 'Error Occcurred while fetching Result by batch and student : ' + error);
        }
    },
    
    
    deleteResult: async (req, res) => {
        const {Result_ID} = req.params;
        try {
            const results = await ResultsModel.getResultById(Result_ID);
            if(results.length === 0)
                return errorResponse(res, 'Result with this id does not exist', 404);
            const result = await ResultsModel.deleteResult(Result_ID);
            if(result.affectedRows === 0)
                return errorResponse(res, 'Error deleting Result', 500);
            else if(result.affectedRows === 1)
                affectedResult = await ResultsModel.getResultById(Result_ID);
            return successResponse(res, 'Result deleted successfully', affectedResult[0]);
        } catch (error) {
            console.error('Error deleting Result:', error);
            errorResponse(res, 'Error Occurred while deleting Result : ' + error);
        }
    }
};

module.exports = ResultsService;
