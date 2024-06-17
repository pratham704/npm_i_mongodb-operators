import mongoose from "mongoose";


/**
 * @param {string} collectionName
 * @returns {Promise<string>}
 */
const deleteCollection = async(collectionName) => {
    if (!mongoose.connection.readyState) {
        throw new Error("Not connected to MongoDB. Please connect to the database.");
    }

    if (!collectionName) {
        throw new Error("Collection name is required");
    }

    try {
        const collections = await mongoose.connection.db
            .listCollections({ name: collectionName })
            .toArray();

        if (collections.length === 0) {
            return `Collection '${collectionName}' does not exist`;
        }

        await mongoose.connection.db.dropCollection(collectionName);
        return `Collection '${collectionName}' successfully deleted`;
    } catch (error) {
        throw error;
    }
};

export { deleteCollection }