import mongoose from "mongoose";


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

export { checkConnectionStatus }