import { connectToDatabase, aggregateAcrossCollections, disconnectFromDatabase } from "../../../src/index.js";
const uri = process.env.MONGODB_URI || 'mongodb+srv://<username>:<password>@<cluster-address>/<database_Name>?retryWrites=true&w=majority';

const run = async() => {

    //here "pa" and "p" are the collection name 
    //we have kept both the collection same schema , you can change it as well
    //fetching all the details from both the collections whose age is 31 and name is john

    try {
        const data = await connectToDatabase(uri);
        console.log(data);
        const userSchema = {
            name: String,
            age: Number,
            email: { type: String, required: true, unique: true },
        };

        // Example match conditions and aggregation pipeline
        const matchConditions = { name: "john", age: 31 };
        const aggregationPipeline = [{
                $project: {
                    _id: 1,
                    name: 1,
                    age: 1,
                    email: 1,
                    collection: { $literal: "p" }, // Adding a field to indicate collection name
                },
            },
            {
                $unionWith: {
                    coll: "pa",
                    pipeline: [{
                            $match: matchConditions,
                        },
                        {
                            $project: {
                                _id: 1,
                                name: 1,
                                age: 1,
                                email: 1,
                                collection: { $literal: "pa" },
                            },
                        },
                    ],
                },
            },
        ];

        // Perform aggregation across collections 'p' and 'pa'
        const result = await aggregateAcrossCollections({ p: userSchema, pa: userSchema }, ["p", "pa"],
            matchConditions,
            aggregationPipeline
        );

        console.log("Aggregation Result:", result);
    } catch (error) {
        console.error("Error:", error);
    } finally {
        await disconnectFromDatabase();
    }
};

run();