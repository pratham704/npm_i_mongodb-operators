import mongoose from "mongoose";

/**
 * @returns {Promise<string>} 
 */
const disconnectFromDatabase = async() => {
    if (!isConnected) {
        return "No active MongoDB connection to disconnect";
    }

    try {
        await mongoose.disconnect();
        isConnected = false;
        return "Disconnected from MongoDB Atlas";
    } catch (error) {
        throw error;
    }
};
export { disconnectFromDatabase }