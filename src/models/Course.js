const { query } = require('../config/database');

const CourseModel = {
    getAllCourses: async () => {
        try {
            return await query('SELECT * FROM Courses');
        } catch (error) {
            throw error;
        }
    },
    addCourse: async (Course_ID,Course_Name, Course_Code, Lecturer_ID, Semester) => {
        try {
            const results = await query('INSERT INTO Courses (Course_ID, Course_Name, Course_Code, Lecturer_ID, Semester) ' +
                'VALUES (?, ?, ?, ?, ?)', [Course_ID,Course_Name, Course_Code, Lecturer_ID, Semester]);
            return results;
        } catch (error) {
            throw error;
        }
    },
    getCourseById: async (Course_ID) => {
        try {
            const results = await query('SELECT * FROM Courses WHERE Course_Id = ?', [Course_ID]);
            return results;
        } catch (error) {
            throw error;
        }
    },
    getCourseByCode: async (Course_Code) => {
        try {
            const results = await query('SELECT * FROM Courses WHERE Course_Code = ?', [Course_Code]);
            return results;
        } catch (error) {
            throw error;
        }
    },
    getCourseByName: async (Course_Name) => {
        try {
            const results = await query('SELECT * FROM Courses WHERE Course_Name = ?', [Course_Name]);
            return results;
        } catch (error) {
            throw error;
        }
    },
    getCourseByLecturer: async (Lecturer_ID) => {
        try {
            const results = await query('SELECT * FROM Courses WHERE Lecturer_ID = ?', [Lecturer_ID]);
            return results;
        } catch (error) {
            throw error;
        }
    },
    getCourseBySemester: async (Semester) => {
        try {
            const results = await query('SELECT * FROM Courses WHERE Semester = ?', [Semester]);
            return results;
        } catch (error) {
            throw error;
        }
    },
    updateCourse: async (Course_ID, Course_Name, Course_Code, Lecturer_ID, Semester) => {
        try {
            const results = await query('UPDATE Courses SET Course_Name = ?, Course_Code = ?, Lecturer_ID = ? , Semester = ? WHERE Course_ID = ?', [Course_Name, Course_Code, Lecturer_ID, Semester, Course_ID]);
            return results;
        } catch (error) {
            throw error;
        }
    },
    deleteCourse: async (Course_ID) => {
        try {
            const results = await query('DELETE FROM Courses WHERE Course_ID = ?', [Course_ID]);
            return results;
        } catch (error) {
            throw error;
        }
    }
};

module.exports = CourseModel;