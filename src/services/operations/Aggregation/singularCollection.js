import mongoose from "mongoose";



/**
 * @param {string} collectionName - The name of the collection.
 * @param {object} schemaDefinition - The Mongoose schema definition.
 * @param {array} aggregationPipeline - The aggregation pipeline array.
 * @returns {Promise<array>} - Returns the result of the aggregation pipeline.
 */
const performAggregation = async(collectionName, schemaDefinition, aggregationPipeline) => {
    if (!mongoose.connection.readyState) {
        throw new Error("Not connected to MongoDB. Please connect to the database.");
    }
    if (!collectionName || !aggregationPipeline || !Array.isArray(aggregationPipeline)) {
        throw new Error(
            "Collection name, aggregation pipeline (as an array), and schema definition (if provided) are required"
        );
    }

    try {
        const schema = new mongoose.Schema(schemaDefinition, {
            collection: collectionName,
        });

        const model = mongoose.model(collectionName, schema);

        const aggregationResult = await model.aggregate(aggregationPipeline);

        return aggregationResult;
    } catch (error) {
        console.error(
            `Error performing aggregation on collection '${collectionName}':`,
            error
        );
        throw error;
    }
};

export { performAggregation }