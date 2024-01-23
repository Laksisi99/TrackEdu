const express = require('express');
const router = express.Router();
const AdminService = require('../services/AdminService');
const ClubService = require('../services/ClubService');
const BatchService = require('../services/BatchService');
const LecturerService = require('../services/LecturerService');

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


module.exports = router;
