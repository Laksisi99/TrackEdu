const BatchModel = require('../models/Batch');
const { successResponse, errorResponse } = require('../utils/responseUtils');

const BatchService = {
    sampleEndPoint: async (req, res) => {
        const receivedData = req.body;
        console.log('Received data:', receivedData);
        res.status(200).json({ message: 'Data received successfully', data: receivedData });
    },
    getAllBatches: async (req, res) => {
        try {
            const results = await BatchModel.getAllBatches();
            if(results.lenght === 0) return errorResponse(res, 'No Batches found', 404);
            successResponse(res, 'Batches retrieved successfully', results)
        }  catch (error) {
            console.error('Error in Batches:', error);
            errorResponse(res, 'Error Occcurred while fetching Batches : ' + error);
        }
    },
    getBatchById: async (req, res) => {
        const { Batch_ID } = req.params;
        try {
            const results = await BatchModel.getBatchById(Batch_ID);
            if(results.lenght === 0) return errorResponse(res, 'No Batch found', 404);
            successResponse(res, 'Batch retrieved successfully', results)
        }  catch (error) {
            console.error('Error in Batch:', error);
            errorResponse(res, 'Error Occcurred while fetching Batch by id : ' + error);
        }
    },
    getBatchByCode: async (req, res) => {
        const { Batch_Code } = req.params;
        try {
            const results = await BatchModel.getBatchByCode(Batch_Code);
            if(results.lenght === 0) return errorResponse(res, 'No Batch found', 404);
            successResponse(res, 'Batch retrieved successfully', results)
        }  catch (error) {
            console.error('Error in Batch:', error);
            errorResponse(res, 'Error Occcurred while fetching Batch by code : ' + error);
        }
    },
    addBatch: async (req, res) => {
        const {Batch_Start_Year, Batch_End_Year, Batch_Code} = req.body;
        if(!Batch_Start_Year || !Batch_End_Year || !Batch_Code){
            return errorResponse(res, 'Batch_Start_Year, Batch_End_Year and Batch_Code are required fields', 400);
        }

        let affectedBatch;
        try {
            const codeResults = await BatchModel.getBatchByCode(Batch_Code);

            if(codeResults.length !== 0)
                return errorResponse(res, 'Batch with this code already exists', 400);

            const Batch_ID = Math.floor(Math.random() * 1000000000);
            const result = await BatchModel.addBatch(Batch_ID, Batch_Start_Year, Batch_End_Year, Batch_Code);

            if(result.affectedRows === 0)
                return errorResponse(res, 'Error adding Batch', 500);
            else if(result.affectedRows === 1)
                affectedBatch = await BatchModel.getBatchById(Batch_ID);
            return successResponse(res, 'Batch added successfully', affectedBatch[0]);
        } catch (error) {
            console.error('Error adding Batch:', error);
            errorResponse(res, 'Error Occurred while adding Batch : ' + error);
        }
    },
    updateBatch: async (req, res) => {
        const {Batch_ID} = req.params;
        const {
            Batch_Start_Year,
            Batch_End_Year,
            Batch_Code
        } = req.body;
        try {
            const results = await BatchModel.getBatchById(Batch_ID);
            if(results.length === 0)
                return errorResponse(res, 'Batch with this id does not exist', 404);
            const result = await BatchModel.updateBatch(Batch_ID, Batch_Start_Year, Batch_End_Year, Batch_Code);
            if(result.affectedRows === 0)
                return errorResponse(res, 'Error updating Batch', 500);
            else if(result.affectedRows === 1)
                affectedBatch = await BatchModel.getBatchById(Batch_ID);
            return successResponse(res, 'Batch updated successfully', affectedBatch[0]);
        } catch (error) {
            console.error('Error updating Batch:', error);
            errorResponse(res, 'Error Occurred while updating Batch : ' + error);
        }
    },
    deleteBatch: async (req, res) => {
        const {Batch_ID} = req.params;
        try {
            const results = await BatchModel.getBatchById(Batch_ID);
            if(results.length === 0)
                return errorResponse(res, 'Batch with this id does not exist', 404);
            const result = await BatchModel.deleteBatch(Batch_ID);
            if(result.affectedRows === 0)
                return errorResponse(res, 'Error deleting Batch', 500);
            else if(result.affectedRows === 1)
                affectedBatch = await BatchModel.getBatchById(Batch_ID);
            return successResponse(res, 'Batch deleted successfully', affectedBatch[0]);
        } catch (error) {
            console.error('Error deleting Batch:', error);
            errorResponse(res, 'Error Occurred while deleting Batch : ' + error);
        }
    }
};

module.exports = BatchService;