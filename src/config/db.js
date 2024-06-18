import mongoose from "mongoose";
let isConnected = false;

/**
 * @param {string} uri 
 * @param {object} options 
 * @returns {Promise<string>} 
 */
const connectToDatabase = async(uri, options = {}) => {
    if (!uri) {
        throw new Error("MongoDB connection string is required");
    }

    if (isConnected) {
        return "Already Connected to MongoDB ";
    }

    try {
        await mongoose.connect(uri, {
            ...options,
        });
        isConnected = true;
        return "Connected to MongoDB ";
    } catch (error) {
        throw error;
    }
};

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

/**
 * @returns {string} - Returns the connection status.
 */
const checkConnectionStatus = () => {
    const status = mongoose.connection.readyState;
    switch (status) {
        case 0:
            return "Disconnected";
        case 1:
            return "Connected";
        case 2:
            return "Connecting";
        case 3:
            return "Disconnecting";
        default:
            return "Unknown";
    }
};



export {
    connectToDatabase,
    disconnectFromDatabase,
    checkConnectionStatus,
};