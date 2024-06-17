import { createCollection, connectToDatabase } from "../../src/index.js";


const uri = process.env.MONGODB_URI || 'mongodb+srv://<username>:<password>@<cluster-address>/<database_Name>?retryWrites=true&w=majority';
const run = async() => {
    try {
        const data = await connectToDatabase(uri);
        console.log(data)

        const schemaDefinition = {
            message: { type: String, required: true }
        };
        const datas = await createCollection("newCollection", schemaDefinition);
        console.log(datas)

    } catch (error) {
        console.error('Error:', error);
    } finally {

    }
};

run();