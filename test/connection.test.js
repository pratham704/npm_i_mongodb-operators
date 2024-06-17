import { connectToDatabase, disconnectFromDatabase, checkConnectionStatus } from "../src/index.js";

const uri = process.env.MONGODB_URI || 'mongodb+srv://<username>:<password>@<cluster-address>/<database_Name>?retryWrites=true&w=majority';
const run = async() => {
    try {
        await connectToDatabase(uri);
        const status = await checkConnectionStatus();
        console.log(status)

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await disconnectFromDatabase();
        const status = await checkConnectionStatus();
        console.log(status)
    }
};

run();