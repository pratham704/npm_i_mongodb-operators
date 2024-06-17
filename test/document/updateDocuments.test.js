import { connectToDatabase, updateDocuments } from "../../src/index.js";


const uri = process.env.MONGODB_URI || 'mongodb+srv://<username>:<password>@<cluster-address>/<database_Name>?retryWrites=true&w=majority';
const run = async() => {
    try {
        const data = await connectToDatabase(uri);
        console.log(data)

        const schemaDefinition = {
            message: { type: String, required: true }
        };

        const datas = await updateDocuments("hey", schemaDefinition, { message: "type your message" }, { message: "all updated text" }, )
        console.log(datas)


    } catch (error) {
        console.error('Error:', error);
    } finally {

    }
};

run();