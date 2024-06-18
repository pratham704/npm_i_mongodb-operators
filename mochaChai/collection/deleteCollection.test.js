import { connectToDatabase, deleteCollection } from "mongodb-operators";


const uri = process.env.MONGODB_URI || 'mongodb+srv://<username>:<password>@<cluster-address>/<database_Name>?retryWrites=true&w=majority';
const run = async() => {
    try {
        const data = await connectToDatabase(uri);

        const schemaDefinition = {
            message: { type: String, required: true }
        };
        const deleteResult = await deleteCollection("newCollection");

    } catch (error) {
        console.error('Error:', error);
    } finally {

    }
};

run();