import mongoose from "mongoose";

/**
 * @param {string} collectionName 
 * @param {object} schemaDefinition 
 * @param {object} documentData 
 * @param {boolean} timestamps 
 * @returns {Promise<object>} 
 */
const createDocument = async(collectionName, schemaDefinition, documentData, timestamps = true) => {
    if (!mongoose.connection.readyState) {
        throw new Error("Not connected to MongoDB. Please connect to the database.");
    }

    if (!collectionName || !schemaDefinition || !documentData) {
        throw new Error("Collection name, schema definition, and document data are required");
    }

    try {
        const schemaOptions = {
            collection: collectionName,
        };

        if (timestamps) {
            schemaOptions.timestamps = true;
        }

        const schema = new mongoose.Schema(schemaDefinition, schemaOptions);
        const model = mongoose.model(collectionName, schema);
        const document = new model(documentData);
        const savedDocument = await document.save();

        return savedDocument;
    } catch (error) {
        throw error;
    }
};

export { createDocument }