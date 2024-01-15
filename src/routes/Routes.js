const express = require('express');
const router = express.Router();
const AdminService = require('../services/AdminService');
const ClubService = require('../services/ClubService');

//admin routes
router.post('/admin/add', AdminService.addAdmin);
router.get('/admin', AdminService.getAllAdmins);
router.get('/admin/getById/:Admin_ID', AdminService.getAdminById);
router.get('/admin/getByEmail/:Admin_Email', AdminService.getAdminByEmail);
router.put('/admin/update/:Admin_ID', AdminService.updateAdmin);
router.delete('/admin/drop/:Admin_ID', AdminService.deleteAdmin);

//club routes
router.post('/club/add', ClubService.addClub);
router.get('/club', ClubService.getAllClubs);
router.get('/club/getById/:Club_ID', ClubService.getClubById);
router.get('/club/getByCode/:Club_Code', ClubService.getClubByCode);
router.get('/club/getByName/:Club_Name', ClubService.getClubByName);
router.put('/club/update/:Club_ID', ClubService.updateClub);
router.delete('/club/drop/:Club_ID', ClubService.deleteClub);


module.exports = router;
