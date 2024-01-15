const ClubModel = require('../models/Club');
const { successResponse, errorResponse } = require('../utils/responseUtils');

const ClubService = {
    sampleEndPoint: async (req, res) => {
        const receivedData = req.body;
        console.log('Received data:', receivedData);
        res.status(200).json({ message: 'Data received successfully', data: receivedData });
    },
    getAllClubs: async (req, res) => {
        try {
            const results = await ClubModel.getAllClubs();
            if(results.lenght === 0) return errorResponse(res, 'No Clubs found', 404);
            successResponse(res, 'Clubs retrieved successfully', results)
        }  catch (error) {
            console.error('Error in Clubs:', error);
            errorResponse(res, 'Error Occcurred while fetching Clubs : ' + error);
        }
    },
    getClubById: async (req, res) => {
        const { Club_ID } = req.params;
        try {
            const results = await ClubModel.getClubById(Club_ID);
            if(results.lenght === 0) return errorResponse(res, 'No Club found', 404);
            successResponse(res, 'Club retrieved successfully', results)
        }  catch (error) {
            console.error('Error in Club:', error);
            errorResponse(res, 'Error Occcurred while fetching Club by id : ' + error);
        }
    },
    getClubByCode: async (req, res) => {
        const { Club_Code } = req.params;
        try {
            const results = await ClubModel.getClubByCode(Club_Code);
            if(results.lenght === 0) return errorResponse(res, 'No Club found', 404);
            successResponse(res, 'Club retrieved successfully', results)
        }  catch (error) {
            console.error('Error in Club:', error);
            errorResponse(res, 'Error Occcurred while fetching Club by code : ' + error);
        }
    },
    getClubByName: async (req, res) => {
        const { Club_Name } = req.params;
        try {
            const results = await ClubModel.getClubByName(Club_Name);
            if(results.lenght === 0) return errorResponse(res, 'No Club found', 404);
            successResponse(res, 'Club retrieved successfully', results)
        }  catch (error) {
            console.error('Error in Club:', error);
            errorResponse(res, 'Error Occcurred while fetching Club by name : ' + error);
        }
    },
    addClub: async (req, res) => {
        const {Club_Name, Club_Code} = req.body;
        if(!Club_Name || !Club_Code){
            return errorResponse(res, 'Club_Name and Club_Code are required fields', 400);
        }

        let affectedClub;
        try {
            const codeResults = await ClubModel.getClubByCode(Club_Code);

            if(codeResults.length !== 0)
                return errorResponse(res, 'Club with this code already exists', 400);

            const Club_ID = Math.floor(Math.random() * 1000000000);
            const result = await ClubModel.addClub(Club_ID, Club_Name, Club_Code);

            if(result.affectedRows === 0)
                return errorResponse(res, 'Error adding Club', 500);
            else if(result.affectedRows === 1)
                affectedClub = await ClubModel.getClubById(Club_ID);
            return successResponse(res, 'Club added successfully', affectedClub[0]);
        } catch (error) {
            console.error('Error adding Club:', error);
            errorResponse(res, 'Error Occurred while adding Club : ' + error);
        }
    },
    updateClub: async (req, res) => {
        const {Club_ID} = req.params;
        const {
            Club_Name,
            Club_Code
        } = req.body;
        try {
            const results = await ClubModel.getClubById(Club_ID);
            if(results.length === 0)
                return errorResponse(res, 'Club with this id does not exist', 404);
            const result = await ClubModel.updateClub(Club_ID, Club_Name, Club_Code);
            if(result.affectedRows === 0)
                return errorResponse(res, 'Error updating Club', 500);
            else if(result.affectedRows === 1)
                affectedClub = await ClubModel.getClubById(Club_ID);
            return successResponse(res, 'Club updated successfully', affectedClub[0]);
        } catch (error) {
            console.error('Error updating Club:', error);
            errorResponse(res, 'Error Occurred while updating Club : ' + error);
        }
    }, 
    deleteClub: async (req, res) => {
        const {Club_ID} = req.params;
        try {
            const results = await ClubModel.getClubById(Club_ID);
            if(results.length === 0)
                return errorResponse(res, 'Club with this id does not exist', 404);
            const result = await ClubModel.deleteClub(Club_ID);
            if(result.affectedRows === 0)
                return errorResponse(res, 'Error deleting Club', 500);
            else if(result.affectedRows === 1)
                affectedClub = await ClubModel.getClubById(Club_ID);
            return successResponse(res, 'Club deleted successfully', affectedClub[0]);
        } catch (error) {
            console.error('Error deleting Club:', error);
            errorResponse(res, 'Error Occurred while deleting Club : ' + error);
        }
    }
    
};

module.exports = ClubService;