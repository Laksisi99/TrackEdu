const { query } = require('../config/database');

const ResultModel = {
    
    addResult: async (Student_ID, Batch_ID, Course_ID, Academic_Staff_ID, Lecturer_ID, Semester_ID, Assignment_1, Assignment_2, Assignment_3, Assignment_4, Assignment_5, Mid_Exam, End_Exam) => {
        try {
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

            // Insert the result into the database
            const results = await query('INSERT INTO student_results (Student_ID, Batch_ID, Course_ID, Academic_Staff_ID, Lecturer_ID, Semester_ID, Assignment_1, Assignment_2, Assignment_3, Assignment_4, Assignment_5, Mid_Exam, End_Exam, Total_Result, Grade) ' +
                'VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [Student_ID, Batch_ID, Course_ID, Academic_Staff_ID, Lecturer_ID, Semester_ID, Assignment_1, Assignment_2, Assignment_3, Assignment_4, Assignment_5, Mid_Exam, End_Exam, total_result, grade]);
            return results;
        } catch (error) {
            throw error;
        }
    },

    updateResult: async (Result_ID, Academic_Staff_ID, Assignment_1, Assignment_2, Assignment_3, Assignment_4, Assignment_5, Mid_Exam, End_Exam) => {
        try {
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

            // Update the result in the database
            const results = await query('UPDATE student_results SET Academic_Staff_ID = ?, Assignment_1 = ?, Assignment_2 = ?, Assignment_3 = ?, Assignment_4 = ?, Assignment_5 = ?, Mid_Exam = ?, End_Exam = ?, Total_Result = ?, Grade = ? WHERE Result_ID = ?',
                [Academic_Staff_ID, Assignment_1, Assignment_2, Assignment_3, Assignment_4, Assignment_5, Mid_Exam, End_Exam, total_result, grade, Result_ID]);
            return results;
        } catch (error) {
            throw error;
        }
    },

    deleteResult: async (Result_ID) => {
        try {
            return await query('DELETE FROM student_results WHERE Result_ID = ?', [Result_ID]);
        } catch (error) {
            throw error;
        }
    },

    getResultByStudentAndSemester: async (Student_ID, Semester_ID) => {
        try {
            const results = await query('SELECT * FROM student_results WHERE Student_ID = ? AND Semester_ID = ?', [Student_ID, Semester_ID]);
            return results;
        } catch (error) {
            throw error;
        }
    }, 

    getResultByCourseAndSemester: async (Course_ID, Semester_ID) => {
        try {
            const results = await query('SELECT * FROM student_results WHERE Course_ID = ? AND Semester_ID = ?', [Course_ID, Semester_ID]);
            return results;
        } catch (error) {
            throw error;
        }
    },

    getResultByStudentAndCourse: async (Student_ID, Course_ID) => {
        try {
            const results = await query('SELECT * FROM student_results WHERE Student_ID = ? AND Course_ID = ?', [Student_ID, Course_ID]);
            return results;
        } catch (error) {
            throw error;
        }
    },

    getResultByStudentAndCourseAndSemester: async (Student_ID, Course_ID, Semester_ID) => {
        try {
            const results = await query('SELECT * FROM student_results WHERE Student_ID = ? AND Course_ID = ? AND Semester_ID = ?', [Student_ID, Course_ID, Semester_ID]);
            return results;
        } catch (error) {
            throw error;
        }
    },

    getAllResults: async () => {
        try {
            const results = await query('SELECT * FROM student_results');
            return results;
        } catch (error) {
            throw error;
        }
    },

    getResultById: async (Result_ID) => {
        try {
            const results = await query('SELECT * FROM student_results WHERE Result_ID = ?', [Result_ID]);
            return results;
        } catch (error) {
            throw error;
        }
    },

    getResultByStudent: async (Student_ID) => {
        try {
            const results = await query('SELECT * FROM student_results WHERE Student_ID = ?', [Student_ID]);
            return results;
        } catch (error) {
            throw error;
        }
    },

    getResultByCourse: async (Course_ID) => {
        try {
            const results = await query('SELECT * FROM student_results WHERE Course_ID = ?', [Course_ID]);
            return results;
        } catch (error) {
            throw error;
        }
    },

    getResultBySemester: async (Semester_ID) => {
        try {
            const results = await query('SELECT * FROM student_results WHERE Semester_ID = ?', [Semester_ID]);
            return results;
        } catch (error) {
            throw error;
        }
    },

    getResultByBatch: async (Batch_ID) => {
        try {
            const results = await query('SELECT * FROM student_results WHERE Batch_ID = ?', [Batch_ID]);
            return results;
        } catch (error) {
            throw error;
        }
    },

    getResultByBatchAndCourse: async (Batch_ID, Course_ID) => {
        try {
            const results = await query('SELECT * FROM student_results WHERE Batch_ID = ? AND Course_ID = ?', [Batch_ID, Course_ID]);
            return results;
        } catch (error) {
            throw error;
        }
    },

    getResultByBatchAndSemester: async (Batch_ID, Semester_ID) => {
        try {
            const results = await query('SELECT * FROM student_results WHERE Batch_ID = ? AND Semester_ID = ?', [Batch_ID, Semester_ID]);
            return results;
        } catch (error) {
            throw error;
        }
    },

    getResultByBatchAndStudent: async (Batch_ID, Student_ID) => {
        try {
            const results = await query('SELECT * FROM student_results WHERE Batch_ID = ? AND Student_ID = ?', [Batch_ID, Student_ID]);
            return results;
        } catch (error) {
            throw error;
        }
    },

    getResultByBatchAndStudentAndCourse: async (Batch_ID, Student_ID, Course_ID) => {
        try {
            const results = await query('SELECT * FROM student_results WHERE Batch_ID = ? AND Student_ID = ? AND Course_ID = ?', [Batch_ID, Student_ID, Course_ID]);
            return results;
        } catch (error) {
            throw error;
        }
    },

    getResultByBatchAndStudentAndSemester: async (Batch_ID, Student_ID, Semester_ID) => {
        try {
            const results = await query('SELECT * FROM student_results WHERE Batch_ID = ? AND Student_ID = ? AND Semester_ID = ?', [Batch_ID, Student_ID, Semester_ID]);
            return results;
        } catch (error) {
            throw error;
        }
    },

    getResultByBatchAndCourseAndSemester: async (Batch_ID, Course_ID, Semester_ID) => {
        try {
            const results = await query('SELECT * FROM student_results WHERE Batch_ID = ? AND Course_ID = ? AND Semester_ID = ?', [Batch_ID, Course_ID, Semester_ID]);
            return results;
        } catch (error) {
            throw error;
        }
    },

    getResultByBatchAndCourseAndStudent: async (Batch_ID, Course_ID, Student_ID) => {
        try {
            const results = await query('SELECT * FROM student_results WHERE Batch_ID = ? AND Course_ID = ? AND Student_ID = ?', [Batch_ID, Course_ID, Student_ID]);
            return results;
        } catch (error) {
            throw error;
        }
    },

    getResultByBatchAndStudentAndCourseAndSemester: async (Batch_ID, Student_ID, Course_ID, Semester_ID) => {
        try {
            const results = await query('SELECT * FROM student_results WHERE Batch_ID = ? AND Student_ID = ? AND Course_ID = ? AND Semester_ID = ?', [Batch_ID, Student_ID, Course_ID, Semester_ID]);
            return results;
        } catch (error) {
            throw error;
        }
    }

};

module.exports = ResultModel;

