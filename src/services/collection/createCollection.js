import mongoose from "mongoose";

/**
 * @param {string} collectionName 
 * @param {object} schemaDefinition 
 * @returns {Promise<mongoose.Model>} 
 */
const createCollection = async(collectionName, schemaDefinition) => {
    if (!mongoose.connection.readyState) {
        throw new Error("Not connected to MongoDB. Please connect to the database.");
    }

    if (!collectionName || !schemaDefinition) {
        throw new Error("Collection name and schema definition are required");
    }

    try {
        const schema = new mongoose.Schema(schemaDefinition);
        const model = mongoose.model(collectionName, schema);

        await mongoose.connection.createCollection(collectionName);

        console.log(`Created collection '${collectionName}'`);

        return model;
    } catch (error) {
        throw error;
    }
};





export { createCollection }