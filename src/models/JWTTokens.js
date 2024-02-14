// -- Table structure for table `jwttokensacademicstaff`
// --

// DROP TABLE IF EXISTS `jwttokensacademicstaff`;
// CREATE TABLE IF NOT EXISTS `jwttokensacademicstaff` (
//   `TokenID` int NOT NULL AUTO_INCREMENT,
//   `Token` varchar(255) NOT NULL,
//   `RefreshToken` varchar(255) NOT NULL,
//   `UserID` int DEFAULT NULL,
//   PRIMARY KEY (`TokenID`),
//   KEY `UserID` (`UserID`)
// ) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

// -- --------------------------------------------------------

// --
// -- Table structure for table `jwttokensadmin`
// --

// DROP TABLE IF EXISTS `jwttokensadmin`;
// CREATE TABLE IF NOT EXISTS `jwttokensadmin` (
//   `TokenID` int NOT NULL AUTO_INCREMENT,
//   `Token` varchar(255) NOT NULL,
//   `RefreshToken` varchar(255) NOT NULL,
//   `UserID` int DEFAULT NULL,
//   PRIMARY KEY (`TokenID`),
//   KEY `UserID` (`UserID`)
// ) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

// -- --------------------------------------------------------

// --
// -- Table structure for table `jwttokenslecturer`
// --

// DROP TABLE IF EXISTS `jwttokenslecturer`;
// CREATE TABLE IF NOT EXISTS `jwttokenslecturer` (
//   `TokenID` int NOT NULL AUTO_INCREMENT,
//   `Token` varchar(255) NOT NULL,
//   `RefreshToken` varchar(255) NOT NULL,
//   `UserID` int DEFAULT NULL,
//   PRIMARY KEY (`TokenID`),
//   KEY `UserID` (`UserID`)
// ) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

// -- --------------------------------------------------------

// --
// -- Table structure for table `jwttokensnonacademicstaff`
// --

// DROP TABLE IF EXISTS `jwttokensnonacademicstaff`;
// CREATE TABLE IF NOT EXISTS `jwttokensnonacademicstaff` (
//   `TokenID` int NOT NULL AUTO_INCREMENT,
//   `Token` varchar(255) NOT NULL,
//   `RefreshToken` varchar(255) NOT NULL,
//   `UserID` int DEFAULT NULL,
//   PRIMARY KEY (`TokenID`),
//   KEY `UserID` (`UserID`)
// ) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

// -- --------------------------------------------------------

// --
// -- Table structure for table `jwttokensstudent`
// --

// DROP TABLE IF EXISTS `jwttokensstudent`;
// CREATE TABLE IF NOT EXISTS `jwttokensstudent` (
//   `TokenID` int NOT NULL AUTO_INCREMENT,
//   `Token` varchar(255) NOT NULL,
//   `RefreshToken` varchar(255) NOT NULL,
//   `UserID` int DEFAULT NULL,
//   PRIMARY KEY (`TokenID`),
//   KEY `UserID` (`UserID`)
// ) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

const {query} = require('../config/database');

const jwtModel = {

    pushTokenAdmin: async (Token, RefreshToken, UserID) => {
        try{
            return await query('INSERT INTO jwttokensadmin (Token, RefreshToken, UserID) VALUES (?, ?, ?)', [Token, RefreshToken, UserID]);
        } catch (error) {
            return error;
        }
    },

    pushTokenStudent: async (Token, RefreshToken, UserID) => {
        try{
            return await query('INSERT INTO jwttokensstudent (Token, RefreshToken, UserID) VALUES (?, ?, ?)', [Token, RefreshToken, UserID]);
        } catch (error) {
            return error;
        }
    },

    pushTokenLecturer: async (Token, RefreshToken, UserID) => {
        try{
            return await query('INSERT INTO jwttokenslecturer (Token, RefreshToken, UserID) VALUES (?, ?, ?)', [Token, RefreshToken, UserID]);
        } catch (error) {
            return error;
        }
    },

    pushTokenNonAcademicStaff: async (Token, RefreshToken, UserID) => {
        try{
            return await query('INSERT INTO jwttokensnonacademicstaff (Token, RefreshToken, UserID) VALUES (?, ?, ?)', [Token, RefreshToken, UserID]);
        } catch (error) {
            return error;
        }
    },

    pushTokenAcademicStaff: async (Token, RefreshToken, UserID) => {
        try{
            return await query('INSERT INTO jwttokensacademicstaff (Token, RefreshToken, UserID) VALUES (?, ?, ?)', [Token, RefreshToken, UserID]);
        } catch (error) {
            return error;
        }
    },

    getTokenAdmin: async (Token) => {
        try{
            return await query('SELECT * FROM jwttokensadmin WHERE Token = ?', [Token]);
        } catch (error) {
            return error;
        }
    },

    getTokenStudent: async (Token) => {
        try{
            return await query('SELECT * FROM jwttokensstudent WHERE Token = ?', [Token]);
        } catch (error) {
            return error;
        }
    },

    getTokenLecturer: async (Token) => {
        try{
            return await query('SELECT * FROM jwttokenslecturer WHERE Token = ?', [Token]);
        } catch (error) {
            return error;
        }
    },

    getTokenNonAcademicStaff: async (Token) => {
        try{
            return await query('SELECT * FROM jwttokensnonacademicstaff WHERE Token = ?', [Token]);
        } catch (error) {
            return error;
        }
    },

    getTokenAcademicStaff: async (Token) => {
        try{
            return await query('SELECT * FROM jwttokensacademicstaff WHERE Token = ?', [Token]);
        } catch (error) {
            return error;
        }
    },

    getTokenAdmibnByRefreshToken: async (RefreshToken) => {
        try{
            return await query('SELECT * FROM jwttokensadmin WHERE RefreshToken = ?', [RefreshToken]);
        } catch (error) {
            throw error;
        }
    },

    getTokenStudentByRefreshToken: async (RefreshToken) => {
        try{
            return await query('SELECT * FROM jwttokensstudent WHERE RefreshToken = ?', [RefreshToken]);
        }
        catch (error) {
            throw error;
        }   
    },

    getTokenLecturerByRefreshToken: async (RefreshToken) => {
        try{
            return await query('SELECT * FROM jwttokenslecturer WHERE RefreshToken = ?', [RefreshToken]);
        }
        catch (error) {
            throw error;
        }
    },

    getTokenNonAcademicStaffByRefreshToken: async (RefreshToken) => {
        try{
            return await query('SELECT * FROM jwttokensnonacademicstaff WHERE RefreshToken = ?', [RefreshToken]);
        }
        catch (error) {
            throw error;
        }
    },

    getTokenAcademicStaffByRefreshToken: async (RefreshToken) => {
        try{
            return await query('SELECT * FROM jwttokensacademicstaff WHERE RefreshToken = ?', [RefreshToken]);
        }
        catch (error) {
            throw error;
        }
    },

    deleteTokenAdmin: async (Token) => {
        try{
            return await query('DELETE FROM jwttokensadmin WHERE Token = ?', [Token]);
        } catch (error) {
            return error;
        }
    },

    deleteTokenStudent: async (Token) => {
        try{
            return await query('DELETE FROM jwttokensstudent WHERE Token = ?', [Token]);
        } catch (error) {
            return error;
        }
    },

    deleteTokenLecturer: async (Token) => {
        try{
            return await query('DELETE FROM jwttokenslecturer WHERE Token = ?', [Token]);
        } catch (error) {
            return error;
        }
    },

    deleteTokenNonAcademicStaff: async (Token) => {
        try{
            return await query('DELETE FROM jwttokensnonacademicstaff WHERE Token = ?', [Token]);
        } catch (error) {
            return error;
        }
    },

    deleteTokenAcademicStaff: async (Token) => {
        try{
            return await query('DELETE FROM jwttokensacademicstaff WHERE Token = ?', [Token]);
        } catch (error) {
            return error;
        }
    },

    deleteTokenAdminByRefreshToken: async (RefreshToken) => {
        try{
            return await query('DELETE FROM jwttokensadmin WHERE RefreshToken = ?', [RefreshToken]);
        } catch (error) {
            return error;
        }
    },

    deleteTokenStudentByRefreshToken: async (RefreshToken) => {
        try{
            return await query('DELETE FROM jwttokensstudent WHERE RefreshToken = ?', [RefreshToken]);
        } catch (error) {
            return error;
        }
    },

    deleteTokenLecturerByRefreshToken: async (RefreshToken) => {
        try{
            return await query('DELETE FROM jwttokenslecturer WHERE RefreshToken = ?', [RefreshToken]);
        } catch (error) {
            return error;
        }
    },

    deleteTokenNonAcademicStaffByRefreshToken: async (RefreshToken) => {
        try{
            return await query('DELETE FROM jwttokensnonacademicstaff WHERE RefreshToken = ?', [RefreshToken]);
        } catch (error) {
            return error;
        }
    },

    deleteTokenAcademicStaffByRefreshToken: async (RefreshToken) => {
        try{
            return await query('DELETE FROM jwttokensacademicstaff WHERE RefreshToken = ?', [RefreshToken]);
        } catch (error) {
            return error;
        }
    }
}
    
module.exports = jwtModel;