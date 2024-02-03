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
router.put('/course/update/:Course_ID', CourseService.updateCourse);
router.delete('/course/drop/:Course_ID', CourseService.deleteCourse);


module.exports = router;
