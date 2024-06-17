import { performAggregation, connectToDatabase } from "../../../src/index.js";

const uri = process.env.MONGODB_URI || 'mongodb+srv://<username>:<password>@<cluster-address>/<database_Name>?retryWrites=true&w=majority';

const run = async() => {
    try {
        const data = await connectToDatabase(uri);
        console.log(data);
        const userSchema = {
            name: String,
            age: Number,
            email: { type: String, required: true, unique: true },
        };
        const aggregationPipeline = [
            { $match: { name: "john" } }, // Match documents where name is 'John'
            { $group: { _id: null, averageAge: { $avg: "$age" } } },
        ];

        // Perform aggregation
        const result = await performAggregation(
            "p",
            userSchema,
            aggregationPipeline
        );
        console.log("Average age of people named John:", result);
    } catch (error) {
        console.error("Error:", error);
    } finally {
        // await disconnectFromDatabase();
    }
};

run();