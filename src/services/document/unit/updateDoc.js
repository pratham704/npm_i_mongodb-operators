import mongoose from "mongoose";
/**
 * @param {string} collectionName 
 * @param {object} schemaDefinition 
 * @param {object} query 
 * @param {object} updateData 
 * @param {string} updateType 
 * @returns {Promise<object>} 
 */


const updateDocument = async(
    collectionName,
    schemaDefinition,
    query,
    updateData,
    updateType = "one"
) => {
    if (!mongoose.connection.readyState) {
        throw new Error("Not connected to MongoDB. Please connect to the database.");
    }
    if (!collectionName || !schemaDefinition || !query || !updateData) {
        throw new Error(
            "Collection name, schema definition, query, and update data are required"
        );
    }

    try {
        const schema = new mongoose.Schema(schemaDefinition, {
            collection: collectionName,
        });

        const model = mongoose.model(collectionName, schema);

        let updateResult;
        if (updateType === "many") {
            updateResult = await model.updateMany(query, updateData);
        } else {
            updateResult = await model.updateOne(query, updateData);
        }

        return updateResult;
    } catch (error) {
        console.error(
            `Error updating document(s) in collection '${collectionName}':`,
            error
        );
        throw error;
    }
};

export { updateDocument }