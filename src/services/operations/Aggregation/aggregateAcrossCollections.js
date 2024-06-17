import mongoose from "mongoose";
/**
 * @param {object} collectionSchemas - An object containing schemas for each collection.
 * @param {array} collectionNames - An array of collection names to perform aggregation on.
 * @param {object} matchConditions - Conditions to match documents across collections (e.g., common attribute).
 * @param {array} aggregationPipeline - The aggregation pipeline array for further processing.
 * @returns {Promise<array>} - Returns the result of the aggregation pipeline.
 */
const aggregateAcrossCollections = async(collectionSchemas, collectionNames, matchConditions, aggregationPipeline) => {
    if (!mongoose.connection.readyState) {
        throw new Error("Not connected to MongoDB");
    }

    if (!collectionSchemas || !collectionNames || !matchConditions || !aggregationPipeline || !Array.isArray(aggregationPipeline)) {
        throw new Error(
            "Collection schemas, collection names, match conditions, and aggregation pipeline (as an array) are required"
        );
    }

    try {
        const models = {};
        for (let i = 0; i < collectionNames.length; i++) {
            const collectionName = collectionNames[i];
            if (!collectionSchemas[collectionName]) {
                throw new Error(`Schema not provided for collection '${collectionName}'`);
            }
            const schema = new mongoose.Schema(collectionSchemas[collectionName], {
                collection: collectionName,
            });
            models[collectionName] = mongoose.model(collectionName, schema);
        }

        const aggregationResult = await models[collectionNames[0]].aggregate([{
                $match: matchConditions
            },
            ...aggregationPipeline
        ]);

        return aggregationResult;
    } catch (error) {
        console.error(`Error performing aggregation across collections:`, error);
        throw error;
    }
};
export { aggregateAcrossCollections }