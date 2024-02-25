const express = require('express');
const router = express.Router();
const AdminService = require('../services/AdminService');
const ClubService = require('../services/ClubService');
const BatchService = require('../services/BatchService');
const LecturerService = require('../services/LecturerService');
const StudentService = require('../services/StudentService');
const AcademicStaffService = require('../services/AcademicStaffService');
const NonAcademicStaffService = require('../services/NonAcademicStaffService');
const CourseService = require('../services/CourseService');
const SemesterService = require('../services/SemesterService');
const RoleService = require('../services/RoleService');
const AuthService = require('../services/AuthService');
const TokenAuth = require('../security/TokenAuth');
const ResultService = require('../services/ResultService');

//auth routes
router.post('/auth/admin', AuthService.authAdmin);
router.post('/auth/lecturer', AuthService.authLecturer);
router.post('/auth/student', AuthService.authStudent);
router.post('/auth/academicStaff', AuthService.authAcademicStaff);
router.post('/auth/nonAcademicStaff', AuthService.authNonAcademicStaff);
router.post('/auth/refreshAdmin', AuthService.newAuthTokenByRefreshTokenAdmin);
router.post('/auth/refreshLecturer', AuthService.newAuthTokenByRefreshTokenLecturer);
router.post('/auth/refreshStudent', AuthService.newAuthTokenByRefreshTokenStudent);
router.post('/auth/refreshAcademicStaff', AuthService.newAuthTokenByRefreshTokenAcademicStaff);
router.post('/auth/refreshNonAcademicStaff', AuthService.newAuthTokenByRefreshTokenNonAcademicStaff);

//admin routes
router.post('/admin/add', AdminService.addAdmin);
router.get('/admin', AdminService.getAllAdmins);
router.get('/admin/getById/:Admin_ID', AdminService.getAdminById);
router.get('/admin/getByEmail/:Admin_Email', AdminService.getAdminByEmail);
router.put('/admin/update/:Adminbatch_ID', AdminService.updateAdmin);
router.delete('/admin/drop/:Admin_ID', AdminService.deleteAdmin);

//club routes
router.post('/club/add', ClubService.addClub);
router.get('/club', ClubService.getAllClubs);
router.get('/club/getById/:Club_ID', ClubService.getClubById);
router.get('/club/getByCode/:Club_Code', ClubService.getClubByCode);
router.get('/club/getByName/:Club_Name', ClubService.getClubByName);
router.put('/club/update/:Club_ID', ClubService.updateClub);
router.delete('/club/drop/:Club_ID', ClubService.deleteClub);

//batch routes
router.post('/batch/add', BatchService.addBatch);
router.get('/batch', BatchService.getAllBatches);
router.get('/batch/getById/:Batch_ID', BatchService.getBatchById);
router.get('/batch/getByCode/:Batch_Code', BatchService.getBatchByCode);
router.put('/batch/update/:Batch_ID', BatchService.updateBatch);
router.delete('/batch/drop/:Batch_ID', BatchService.deleteBatch);

//lecturer routes
router.post('/lecturer/add', LecturerService.addLecturer);
router.get('/lecturer', LecturerService.getAllLecturers);
router.get('/lecturer/getById/:Lecturer_ID', LecturerService.getLecturerById);
router.get('/lecturer/getByEmail/:Lecturer_Email', LecturerService.getLecturerByEmail);
router.get('/lecturer/getByName/:Lecturer_Name', LecturerService.getLecturerByName);
router.put('/lecturer/update/:Lecturer_ID', LecturerService.updateLecturer);
router.delete('/lecturer/drop/:Lecturer_ID', LecturerService.deleteLecturer);

//student routes
router.post('/student/add', StudentService.addStudent);
router.get('/student', StudentService.getAllStudents);
router.get('/student/getById/:Student_ID', StudentService.getStudentById);
router.get('/student/getByEmail/:Student_Email', StudentService.getStudentByEmail);
router.get('/student/getByName/:Student_Name', StudentService.getStudentByName);
router.get('/student/getByRegNum/:Student_Reg_Num', StudentService.getStudentByRegNum);
router.put('/student/update/:Student_ID', StudentService.updateStudent);
router.delete('/student/drop/:Student_ID', StudentService.deleteStudent);

//academic staff routes
router.post('/academicStaff/add', AcademicStaffService.addAcademicStaff);
router.get('/academicStaff', AcademicStaffService.getAllAcademicStaff);
router.get('/academicStaff/getById/:Academic_Staff_ID', AcademicStaffService.getAcademicStaffById);
router.get('/academicStaff/getByEmail/:Academic_Staff_Email', AcademicStaffService.getAcademicStaffByEmail);
router.get('/academicStaff/getByName/:Academic_Staff_Name', AcademicStaffService.getAcademicStaffByName);
router.get('/academicStaff/getByNIC/:Academic_Staff_NIC', AcademicStaffService.getAcademicStaffByNIC);
router.put('/academicStaff/update/:Academic_Staff_ID', AcademicStaffService.updateAcademicStaff);
router.delete('/academicStaff/drop/:Academic_Staff_ID', AcademicStaffService.deleteAcademicStaff);

//non academic staff routes
router.post('/nonAcademicStaff/add', NonAcademicStaffService.addNonAcademicStaff);
router.get('/nonAcademicStaff', NonAcademicStaffService.getAllNonAcademicStaff);
router.get('/nonAcademicStaff/getById/:Non_Academic_Staff_ID', NonAcademicStaffService.getNonAcademicStaffById);
router.get('/nonAcademicStaff/getByEmail/:Non_Academic_Staff_Email', NonAcademicStaffService.getNonAcademicStaffByEmail);
router.get('/nonAcademicStaff/getByName/:Non_Academic_Staff_Name', NonAcademicStaffService.getNonAcademicStaffByName);
router.get('/nonAcademicStaff/getByNIC/:Non_Academic_Staff_NIC', NonAcademicStaffService.getNonAcademicStaffByNIC);
router.get('/nonAcademicStaff/getByClubID/:Club_ID', NonAcademicStaffService.getNonAcademicStaffClubID);
router.put('/nonAcademicStaff/update/:Non_Academic_Staff_ID', NonAcademicStaffService.updateNonAcademicStaff);
router.delete('/nonAcademicStaff/drop/:Non_Academic_Staff_ID', NonAcademicStaffService.deleteNonAcademicStaff);

//course routes
router.post('/course/add', CourseService.addCourse);
router.get('/course', CourseService.getAllCourses);
router.get('/course/getById/:Course_ID', CourseService.getCourseById);
router.get('/course/getByCode/:Course_Code', CourseService.getCourseByCode);
router.get('/course/getByName/:Course_Name', CourseService.getCourseByName);
router.get('/course/getByLecturer/:Lecturer_ID', CourseService.getCourseByLecturer);
router.get('/course/getBySemester/:Semester', CourseService.getCourseBySemester);
router.put('/course/update/:Course_ID', CourseService.updateCourse);
router.delete('/course/drop/:Course_ID', CourseService.deleteCourse);

//semester routes
router.post('/semester/add', SemesterService.addSemester);
router.get('/semester', SemesterService.getAllSemesters);
router.get('/semester/getById/:Semester_ID', SemesterService.getSemesterById);
router.get('/semester/getByName/:Semester_Name', SemesterService.getSemesterByName);
// router.put('/semester/update/:Semester_ID', SemesterService.updateSemester);
// router.delete('/semester/drop/:Semester_ID', SemesterService.deleteSemester);

// role routes
router.get('/roles', RoleService.getAllRoles);
router.post('/roles/add', RoleService.addRole);
router.get('/roles/:RoleID', RoleService.getRoleByID);
// router.put('/roles/update/:RoleID', RoleService.updateRole);
router.delete('/roles/drop/:RoleID', RoleService.deleteRole);

//results routes
router.post('/results/add', ResultService.addResult);
router.get('/results', ResultService.getAllResults);
router.get('/results/getById/:Results_ID', ResultService.getResultById);
router.get('/results/getByStudentID/:Student_ID', ResultService.getResultByStudent);
router.get('/results/getByCourseID/:Course_ID', ResultService.getResultByCourse);
router.get('/results/getBySemester/:Semester_ID', ResultService.getResultBySemester);
router.get('/results/getByBatch/:Batch_ID', ResultService.getResultByBatch);
router.get('/results/getResultByBatchIDAndSemesterID/:Batch_ID/:Semester_ID', ResultService.getResultByBatchAndSemester);
router.get('/results/getResultByBatchAndCourseAndSemester/:Batch_ID/:Course_ID/:Semester_ID', ResultService.getResultByBatchAndCourseAndSemester);
router.get('/results/getRsultByBatchAndCourseAndSemeseterAndStudent/:Batch_ID/:Course_ID/:Semester_ID/:Student_ID', ResultService.getResultByBatchAndCourseAndSemesterAndStudent);
router.get('/results/getResultsByBatchAndStudent/:Batch_ID/:Student_ID', ResultService.getResultByBatchAndStudent);
router.get('/results/getByStudentAndCourse/:Student_ID/:Course_ID', ResultService.getResultByStudentAndCourse);
router.get('/results/getByStudentAndCourseAndSemester/:Student_ID/:Course_ID/:Semester_ID', ResultService.getResultByStudentAndCourseAndSemester);
router.get('/results/getByStudentAndSemester/:Student_ID/:Semester_ID', ResultService.getResultByStudentAndSemester);
router.get('/results/getByCourseAndSemester/:Course_ID/:Semester_ID', ResultService.getResultByCourseAndSemester);
router.put('/results/update/:Results_ID', ResultService.updateResult);
router.delete('/results/drop/:Results_ID', ResultService.deleteResult);


module.exports = router;
