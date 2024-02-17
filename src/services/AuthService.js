require('dotenv').config();
const authModel = require('../models/Auth');
const jwtTokenModel = require('../models/JWTtokens');
const AdminModel = require('../models/Admin');
const StudentModel = require('../models/Student');
const LecturerModel = require('../models/Lecturer');
const NonAcademicStaffModel = require('../models/NonAcademicStaff');
const AcademicStaffModel = require('../models/AcademicStaff');
const { successResponse, errorResponse } = require('../utils/responseUtils');
const {hashPassword, comparePassword} = require('../utils/bcrypt');
const jwt = require('jsonwebtoken');
const bcrypt = require('../utils/bcrypt');
const { generateAccessToken, generateRefreshToken } = require('../security/TokenGen');
const SignModel = require('../security/SignModel');
const RoleModel = require('../models/Roles');

const AuthService = {

    authAdmin: async (req, res) => {
        const {Admin_Email, Admin_Password} = req.body;
        try{
            const results = await AdminModel.getAdminByEmail(Admin_Email);
            let passwordFromDataBase = '';
            if(results.length === 0)
                return errorResponse(res, 'Admin does not exist', 404);
            else
                passwordFromDataBase = results[0].Admin_Password;
                const passwordMatch = await bcrypt.comparePassword(Admin_Password, passwordFromDataBase);
                if(passwordMatch === false)
                    return errorResponse(res, 'Invalid Password', 401);
                else{
                    const SignData = new SignModel(
                        results[0].Admin_Email, 
                        results[0].Admin_Id, 
                        'Admin', 
                        new Date(), 
                        results[0].Admin_Name
                    );
                    const deleteToken = await jwtTokenModel.deleteTokenAdminByRefreshToken(results[0].Admin_Id);
                    console.log('Delete Token', +deleteToken);
                    const accessToken = await generateAccessToken({SignData});
                    const refreshToken = await generateRefreshToken({SignData});
                    const pushTokens = await jwtTokenModel.pushTokenAdmin(accessToken, refreshToken, results[0].Admin_Id);
                    if(pushTokens.affectedRows === 0){
                        return errorResponse(res, 'Failed to push token', 500);
                    }else {
                        return successResponse(res, 'Admin Logged in successfully', {accessToken, refreshToken});
                    }
                }

        } catch (error) {
            console.error('Error authenticating customer:', error);
            errorResponse(res, 'Error Occurred while authenticating customer : '+error);
        }

    },

    newAuthTokenByRefreshTokenAdmin: async (req, res) => {
        const {token, userID} = req.body;
        try {
            const results = await jwtTokenModel.getTokenAdmibnByRefreshToken(token, userID);
            if(results.length === 0){
                return errorResponse(res, 'Invalid Token', 401);
            }
            jwt.verify(token, process.env.ACCESS_TOKEN_REFRESH, async (err, user) => {
                if (err){
                    return errorResponse(res, 'Expired, Invalid Access Token, Or Access Token Has Been Changed By SomeOne', 403);
                }
                const getSignDaata = await AdminModel.getAdminById(userID);
                if(getSignDaata.length === 0){
                    return errorResponse(res, 'Admin does not exist', 404);
                }
                const SignData = new SignModel(
                    getSignDaata[0].Admin_Email, 
                    getSignDaata[0].Admin_Id, 
                    'ADMIN', 
                    new Date(), 
                    getSignDaata[0].Admin_Name
                );
                const deleteToken = await jwtTokenModel.deleteTokenAdminByRefreshToken(userID);
                const accessToken = await generateAccessToken({SignData});
                const refreshToken = await generateRefreshToken({SignData});
                const pushTokens = await jwtTokenModel.pushTokenAdmin(accessToken, refreshToken, userID);
                if (getSignDaata.length === 0 || pushTokens.affectedRows === 0) {
                    return errorResponse(res, 'Admin does not exist', 404);
                }
                successResponse(res, 'Admin Logged in successfully', {accessToken, refreshToken});
            });
        } catch (error) {
            console.error('Error authenticating customer:', error);
            errorResponse(res, 'Error Occurred while authenticating customer : '+error);
        }
    

    },
    authStudent: async (req, res) => {
        const {Student_Email, Student_Password} = req.body;
        try{
            const results = await StudentModel.getStudentByEmail(Student_Email);
            let passwordFromDataBase = '';
            if(results.length === 0)
                return errorResponse(res, 'Student does not exist', 404);
            else
                passwordFromDataBase = results[0].Student_Password;
                const passwordMatch = await bcrypt.comparePassword(Student_Password, passwordFromDataBase);
                if(passwordMatch === false)
                    return errorResponse(res, 'Invalid Password', 401);
                else{
                    const SignData = new SignModel(
                        results[0].Student_Email, 
                        results[0].Student_Id, 
                        'Student', 
                        new Date(), 
                        results[0].Student_Name
                    );
                    const deleteToken = await jwtTokenModel.deleteTokenStudentByRefreshToken(results[0].Student_Id);
                    console.log('Delete Token', +deleteToken);
                    const accessToken = await generateAccessToken({SignData});
                    const refreshToken = await generateRefreshToken({SignData});
                    const pushTokens = await jwtTokenModel.pushTokenStudent(accessToken, refreshToken, results[0].Student_Id);
                    if(pushTokens.affectedRows === 0){
                        return errorResponse(res, 'Failed to push token', 500);
                    }else {
                        return successResponse(res, 'Student Logged in successfully', {accessToken, refreshToken});
                    }
                }

        } catch (error) {
            console.error('Error authenticating customer:', error);
            errorResponse(res, 'Error Occurred while authenticating customer : '+error);
        }

    },
    newAuthTokenByRefreshTokenStudent: async (req, res) => {
        const {token, userID} = req.body;
        try {
            const results = await jwtTokenModel.getTokenStudentByRefreshToken(token, userID);
            if(results.length === 0){
                return errorResponse(res, 'Invalid Token', 401);
            }
            jwt.verify(token, process.env.ACCESS_TOKEN_REFRESH, async (err, user) => {
                if (err){
                    return errorResponse(res, 'Expired, Invalid Access Token, Or Access Token Has Been Changed By SomeOne', 403);
                }
                const getSignDaata = await StudentModel.getStudentById(userID);
                if(getSignDaata.length === 0){
                    return errorResponse(res, 'Student does not exist', 404);
                }
                const SignData = new SignModel(
                    getSignDaata[0].Student_Email, 
                    getSignDaata[0].Student_Id, 
                    'STUDENT', 
                    new Date(), 
                    getSignDaata[0].Student_Name
                );
                const deleteToken = await jwtTokenModel.deleteTokenStudentByRefreshToken(userID);
                const accessToken = await generateAccessToken({SignData});
                const refreshToken = await generateRefreshToken({SignData});
                const pushTokens = await jwtTokenModel.pushTokenStudent(accessToken, refreshToken, userID);
                if (getSignDaata.length === 0 || pushTokens.affectedRows === 0) {
                    return errorResponse(res, 'Student does not exist', 404);
                }
                successResponse(res, 'Student Logged in successfully', {accessToken, refreshToken});
            });
        } catch (error) {
            console.error('Error authenticating customer:', error);
            errorResponse(res, 'Error Occurred while authenticating customer : '+error);
        }
    

    },
    authLecturer: async (req, res) => {
        const {Lecturer_Email, Lecturer_Password} = req.body;
        try{
            const results = await LecturerModel.getLecturerByEmail(Lecturer_Email);
            let passwordFromDataBase = '';
            if(results.length === 0)
                return errorResponse(res, 'Lecturer does not exist', 404);
            else
                passwordFromDataBase = results[0].Lecturer_Password;
                const passwordMatch = await bcrypt.comparePassword(Lecturer_Password, passwordFromDataBase);
                if(passwordMatch === false)
                    return errorResponse(res, 'Invalid Password', 401);
                else{
                    const SignData = new SignModel(
                        results[0].Lecturer_Email, 
                        results[0].Lecturer_Id, 
                        'Lecturer', 
                        new Date(), 
                        results[0].Lecturer_Name
                    );
                    const deleteToken = await jwtTokenModel.deleteTokenLecturerByRefreshToken(results[0].Lecturer_Id);
                    console.log('Delete Token', +deleteToken);
                    const accessToken = await generateAccessToken({SignData});
                    const refreshToken = await generateRefreshToken({SignData});
                    const pushTokens = await jwtTokenModel.pushTokenLecturer(accessToken, refreshToken, results[0].Lecturer_Id);
                    if(pushTokens.affectedRows === 0){
                        return errorResponse(res, 'Failed to push token', 500);
                    }else {
                        return successResponse(res, 'Lecturer Logged in successfully', {accessToken, refreshToken});
                    }
                }

        } catch (error) {
            console.error('Error authenticating customer:', error);
            errorResponse(res, 'Error Occurred while authenticating customer : '+error);
        }

    },
    newAuthTokenByRefreshTokenLecturer: async (req, res) => {
        const {token, userID} = req.body;
        try {
            const results = await jwtTokenModel.getTokenLecturerByRefreshToken(token, userID);
            if(results.length === 0){
                return errorResponse(res, 'Invalid Token', 401);
            }
            jwt.verify(token, process.env.ACCESS_TOKEN_REFRESH, async (err, user) => {
                if (err){
                    return errorResponse(res, 'Expired, Invalid Access Token, Or Access Token Has Been Changed By SomeOne', 403);
                }
                const getSignDaata = await LecturerModel.getLecturerById(userID);
                if(getSignDaata.length === 0){
                    return errorResponse(res, 'Lecturer does not exist', 404);
                }
                const SignData = new SignModel(
                    getSignDaata[0].Lecturer_Email, 
                    getSignDaata[0].Lecturer_Id, 
                    'LECTURER', 
                    new Date(), 
                    getSignDaata[0].Lecturer_Name
                );
                const deleteToken = await jwtTokenModel.deleteTokenLecturerByRefreshToken(userID);
                const accessToken = await generateAccessToken({SignData});
                const refreshToken = await generateRefreshToken({SignData});
                const pushTokens = await jwtTokenModel.pushTokenLecturer(accessToken, refreshToken, userID);
                if (getSignDaata.length === 0 || pushTokens.affectedRows === 0) {
                    return errorResponse(res, 'Lecturer does not exist', 404);
                }
                successResponse(res, 'Lecturer Logged in successfully', {accessToken, refreshToken});
            });
        } catch (error) {
            console.error('Error authenticating customer:', error);
            errorResponse(res, 'Error Occurred while authenticating customer : '+error);
        }
    

    },
    authAcademicStaff: async (req, res) => {
        const {AcademicStaff_Email, AcademicStaff_Password} = req.body;
        try{
            const results = await AcademicStaffModel.getAcademicStaffByEmail(AcademicStaff_Email);
            let passwordFromDataBase = '';
            if(results.length === 0)
                return errorResponse(res, 'Academic Staff does not exist', 404);
            else
                passwordFromDataBase = results[0].AcademicStaff_Password;
                const passwordMatch = await bcrypt.comparePassword(AcademicStaff_Password, passwordFromDataBase);
                if(passwordMatch === false)
                    return errorResponse(res, 'Invalid Password', 401);
                else{
                    const SignData = new SignModel(
                        results[0].AcademicStaff_Email, 
                        results[0].AcademicStaff_Id, 
                        'AcademicStaff', 
                        new Date(), 
                        results[0].AcademicStaff_Name
                    );
                    const deleteToken = await jwtTokenModel.deleteTokenAcademicStaffByRefreshToken(results[0].AcademicStaff_Id);
                    console.log('Delete Token', +deleteToken);
                    const accessToken = await generateAccessToken({SignData});
                    const refreshToken = await generateRefreshToken({SignData});
                    const pushTokens = await jwtTokenModel.pushTokenAcademicStaff(accessToken, refreshToken, results[0].AcademicStaff_Id);
                    if(pushTokens.affectedRows === 0){
                        return errorResponse(res, 'Failed to push token', 500);
                    }else {
                        return successResponse(res, 'Academic Staff Logged in successfully', {accessToken, refreshToken});
                    }
                }

        } catch (error) {
            console.error('Error authenticating customer:', error);
            errorResponse(res, 'Error Occurred while authenticating customer : '+error);
        }

    },
    newAuthTokenByRefreshTokenAcademicStaff: async (req, res) => {
        const {token, userID} = req.body;
        try {
            const results = await jwtTokenModel.getTokenAcademicStaffByRefreshToken(token, userID);
            if(results.length === 0){
                return errorResponse(res, 'Invalid Token', 401);
            }
            jwt.verify(token, process.env.ACCESS_TOKEN_REFRESH, async (err, user) => {
                if (err){
                    return errorResponse(res, 'Expired, Invalid Access Token, Or Access Token Has Been Changed By SomeOne', 403);
                }
                const getSignDaata = await AcademicStaffModel.getAcademicStaffById(userID);
                if(getSignDaata.length === 0){
                    return errorResponse(res, 'Academic Staff does not exist', 404);
                }
                const SignData = new SignModel(
                    getSignDaata[0].AcademicStaff_Email, 
                    getSignDaata[0].AcademicStaff_Id, 
                    'ACADEMICSTAFF', 
                    new Date(), 
                    getSignDaata[0].AcademicStaff_Name
                );
                const deleteToken = await jwtTokenModel.deleteTokenAcademicStaffByRefreshToken(userID);
                const accessToken = await generateAccessToken({SignData});
                const refreshToken = await generateRefreshToken({SignData});
                const pushTokens = await jwtTokenModel.pushTokenAcademicStaff(accessToken, refreshToken, userID);
                if (getSignDaata.length === 0 || pushTokens.affectedRows === 0) {
                    return errorResponse(res, 'Academic Staff does not exist', 404);
                }
                successResponse(res, 'Academic Staff Logged in successfully', {accessToken, refreshToken});
            });
        } catch (error) {
            console.error('Error authenticating customer:', error);
            errorResponse(res, 'Error Occurred while authenticating customer : '+error);
        }
    

    },
    authNonAcademicStaff: async (req, res) => {
        const {Non_Academic_Staff_Email, Non_Academic_Staff_Password} = req.body;
        try{
            const results = await NonAcademicStaffModel.getNonAcademicStaffByEmail(Non_Academic_Staff_Email);
            let passwordFromDataBase = '';
            if(results.length === 0)
                return errorResponse(res, 'Non Academic Staff does not exist', 404);
            else
                passwordFromDataBase = results[0].Non_Academic_Staff_Password;
                const passwordMatch = await bcrypt.comparePassword(Non_Academic_Staff_Password, passwordFromDataBase);
                if(passwordMatch === false)
                    return errorResponse(res, 'Invalid Password', 401);
                else{
                    const SignData = new SignModel(
                        results[0].Non_Academic_Staff_Email, 
                        results[0].Non_Academic_Staff_Id, 
                        'NonAcademicStaff', 
                        new Date(), 
                        results[0].Non_Academic_Staff_Name
                    );
                    const deleteToken = await jwtTokenModel.deleteTokenNonAcademicStaffByRefreshToken(results[0].Non_Academic_Staff_Id);
                    console.log('Delete Token', +deleteToken);
                    const accessToken = await generateAccessToken({SignData});
                    const refreshToken = await generateRefreshToken({SignData});
                    const pushTokens = await jwtTokenModel.pushTokenNonAcademicStaff(accessToken, refreshToken, results[0].Non_Academic_Staff_Id);
                    if(pushTokens.affectedRows === 0){
                        return errorResponse(res, 'Failed to push token', 500);
                    }else {
                        return successResponse(res, 'Non Academic Staff Logged in successfully', {accessToken, refreshToken});
                    }
                }

        } catch (error) {
            console.error('Error authenticating customer:', error);
            errorResponse(res, 'Error Occurred while authenticating customer : '+error);
        }

    },
    newAuthTokenByRefreshTokenNonAcademicStaff: async (req, res) => {
        const {token, userID} = req.body;
        try {
            const results = await jwtTokenModel.getTokenNonAcademicStaffByRefreshToken(token, userID);
            if(results.length === 0){
                return errorResponse(res, 'Invalid Token', 401);
            }
            jwt.verify(token, process.env.ACCESS_TOKEN_REFRESH, async (err, user) => {
                if (err){
                    return errorResponse(res, 'Expired, Invalid Access Token, Or Access Token Has Been Changed By SomeOne', 403);
                }
                const getSignDaata = await NonAcademicStaffModel.getNonAcademicStaffById(userID);
                if(getSignDaata.length === 0){
                    return errorResponse(res, 'Non Academic Staff does not exist', 404);
                }
                const SignData = new SignModel(
                    getSignDaata[0].Non_Academic_Staff_Email, 
                    getSignDaata[0].Non_Academic_Staff_Id, 
                    'NONACADEMICSTAFF', 
                    new Date(), 
                    getSignDaata[0].Non_Academic_Staff_Name
                );
                const deleteToken = await jwtTokenModel.deleteTokenNonAcademicStaffByRefreshToken(userID);
                const accessToken = await generateAccessToken({SignData});
                const refreshToken = await generateRefreshToken({SignData});
                const pushTokens = await jwtTokenModel.pushTokenNonAcademicStaff(accessToken, refreshToken, userID);
                if (getSignDaata.length === 0 || pushTokens.affectedRows === 0) {
                    return errorResponse(res, 'Non Academic Staff does not exist', 404);
                }
                successResponse(res, 'Non Academic Staff Logged in successfully', {accessToken, refreshToken});
            });
        } catch (error) {
            console.error('Error authenticating customer:', error);
            errorResponse(res, 'Error Occurred while authenticating customer : '+error);
        }
    }
}

module.exports = AuthService;