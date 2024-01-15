const express = require('express');
const router = express.Router();
const AdminService = require('../services/AdminService');

router.post('/admin/add', AdminService.addAdmin);
router.get('/admin', AdminService.getAllAdmins);
router.get('/admin/getById/:Admin_ID', AdminService.getAdminById);
router.get('/admin/getByEmail/:Admin_Email', AdminService.getAdminByEmail);
router.put('/admin/update/:Admin_ID', AdminService.updateAdmin);
router.delete('/admin/drop/:Admin_ID', AdminService.deleteAdmin);




module.exports = router;
