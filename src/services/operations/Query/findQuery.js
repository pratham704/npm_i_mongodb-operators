import mongoose from "mongoose";
/**
 * @param {string} collectionName - The name of the collection.
 * @param {object} schemaDefinition - The Mongoose schema definition.
 * @param {object} query - The query object to find the document(s).
 * @param {number} findType - Specifies how many documents to find. 0 means find many, 1 means find one, and any other positive number specifies the limit.
 * @param {string} sortOrder - Optional. Specifies the sort order based on timestamps. Can be 'ascending' or 'descending'. If not provided, sorting is ignored.
 * @returns {Promise<object|Array>} - Returns the found document or an array of documents.
 */

const findDocument = async(
    collectionName,
    schemaDefinition,
    query,
    findType = 0,
    sortOrder = null
) => {
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
            timestamps: true,
        });
        const model = mongoose.model(collectionName, schema);
        let queryBuilder = model.find(query);
        if (sortOrder) {
            const sortDirection = sortOrder === "ascending" ? 1 : -1;
            queryBuilder = queryBuilder.sort({ createdAt: sortDirection });
        }
        let foundDocuments;
        if (findType === 1) {
            foundDocuments = await queryBuilder.findOne();
        } else if (findType > 1) {
            foundDocuments = await queryBuilder.limit(findType);
        } else {
            foundDocuments = await queryBuilder;
        }

        return foundDocuments;
    } catch (error) {
        console.error(
            `Error finding document(s) in collection '${collectionName}':`,
            error
        );
        throw error;
    }
};


export { findDocument }