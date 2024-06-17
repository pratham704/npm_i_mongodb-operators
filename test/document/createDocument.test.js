import { connectToDatabase, createDocument } from "../../src/index.js";


const uri = process.env.MONGODB_URI || 'mongodb+srv://<username>:<password>@<cluster-address>/<database_Name>?retryWrites=true&w=majority';
const run = async() => {
    try {
        const data = await connectToDatabase(uri);
        console.log(data)

        const schemaDefinition = {
            message: { type: String, required: true }
        };

        const datas1 = await createDocument("hey", schemaDefinition, { message: "type your message" })
        console.log(datas1)


    } catch (error) {
        console.error('Error:', error);
    } finally {

    }
};

run();