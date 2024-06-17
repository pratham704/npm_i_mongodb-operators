import mongoose from "mongoose";
/**
 * @param {string} collectionName 
 * @param {object} schemaDefinition 
 * @param {object} query 
 * @returns {Promise<object>} 
 */
const deleteDocument = async(collectionName, schemaDefinition, query) => {
    if (!mongoose.connection.readyState) {
        throw new Error("Not connected to MongoDB. Please connect to the database.");
    }

    if (!collectionName || !schemaDefinition || !query) {
        throw new Error(
            "Collection name, schema definition, and query are required"
        );
    }

    try {
        const schema = new mongoose.Schema(schemaDefinition, {
            collection: collectionName,
        });

        const model = mongoose.model(collectionName, schema);

        const deleteResult = await model.deleteOne(query);

        return deleteResult;
    } catch (error) {
        console.error(
            `Error deleting document in collection '${collectionName}':`,
            error
        );
        throw error;
    }
};

export { deleteDocument }