
# MongoDb Operators

A robust MongoDB manager for Node.js and Next.js, streamlining CRUD, aggregations, and schema management with pipeline support, enhancing MongoDB data handling in applications

## Installation

Get started with Installation

```bash
  npm install mongodb-operators
```

## Roadmap

- Establishing and Terminating MongoDB Connections

- Checking MongoDB Connection Status

- Creating Collections with Schemas

- Deleting Collection

- Creating Document

- Updating Document/Documents

- Deleting Document/Documents

- Find Queries with Limiting and Sorting with timestamp

- Aggregation Functions/Methods for Single Collections

- Aggregations Across Collections and Connecting Collections
## Environment Variables

Add your mongoDb uri in .env file or hardcode against it 

`MONGODB_URI`





## MONGODB_URI format
```
mongodb+srv://<username>:<password>@<cluster-address>/<database_Name>?retryWrites=true&w=majority
```
Please make sure you add the database_Name in the URI








## MongoDB connections: establishing, terminating, and monitoring status.
```javascript
import { connectToDatabase, disconnectFromDatabase, checkConnectionStatus } from "mongodb-operators";

const uri = process.env.MONGODB_URI || 'mongodb+srv://<username>:<password>@<cluster-address>/<database_Name>?retryWrites=true&w=majority';

const run = async() => {
    try {
        const conn = await connectToDatabase(uri);
        console.log(conn)
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
```

## Creating Collections with Schemas
```javascript
import { createCollection, connectToDatabase } from "mongodb-operators";

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
```



## Deleting  Collections 
```javascript
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
```




## Creating Document
```javascript
import { connectToDatabase, createDocument } from "mongodb-operators";

const uri = process.env.MONGODB_URI || 'mongodb+srv://<username>:<password>@<cluster-address>/<database_Name>?retryWrites=true&w=majority';

const run = async () => {
    try {
        const db = await connectToDatabase(uri);
        console.log("Connected to database");

        const schemaDefinition = {
            message: { type: String, required: true }
        };

        const collectionName = "users";

        const document = { message: "type your message" };

        
        const result = await createDocument(collectionName, schemaDefinition, document);
        console.log("Document created:", result);

    } catch (error) {
        console.error('Error:', error);
    } finally {
        // Optionally, you can add cleanup code here
    }
};

run();

```



## Updating Document (single document)
```javascript
import { connectToDatabase, updateDocument } from "mongodb-operators";

const uri = process.env.MONGODB_URI || 'mongodb+srv://<username>:<password>@<cluster-address>/<database_Name>?retryWrites=true&w=majority';

const run = async() => {
    try {

    const data = await connectToDatabase(uri);
    console.log(data);

    const collectionName = "users";

    const schemaDefinition = {
    message: { type: String, required: true }
    };

    const filter = { message: "before text " };
    const update = { message: "updated text" };

    const result = await updateDocument(collectionName, schemaDefinition, filter, update);
    console.log(result);


    } catch (error) {
        console.error('Error:', error);
    } finally {

    }
};

run();

```


## Updating Documents (More than one)
```javascript
import { connectToDatabase, updateDocuments } from "mongodb-operators";

const uri = process.env.MONGODB_URI || 'mongodb+srv://<username>:<password>@<cluster-address>/<database_Name>?retryWrites=true&w=majority';

const run = async() => {
    try {

    const data = await connectToDatabase(uri);
    console.log(data);

    const collectionName = "users";

    const schemaDefinition = {
    message: { type: String, required: true }
    };

    const filter = { message: "before text " };
    const update = { message: "updated text" };

    const result = await updateDocuments(collectionName, schemaDefinition, filter, update);
    console.log(result);


    } catch (error) {
        console.error('Error:', error);
    } finally {

    }
};

run();

```


## Deleting Document (single document)
```javascript
import { connectToDatabase, deleteDocument } from "mongodb-operators";

const uri = process.env.MONGODB_URI || 'mongodb+srv://<username>:<password>@<cluster-address>/<database_Name>?retryWrites=true&w=majority';

const run = async() => {
    try {

    const data = await connectToDatabase(uri);
    console.log(data);

    const collectionName = "users";

    const schemaDefinition = {
        message: { type: String, required: true }
    };

    const filter = { message: "type your message" };

    const datas = await deleteDocument(collectionName, schemaDefinition, filter);
    console.log(datas);

    } catch (error) {
        console.error('Error:', error);
    } finally {

    }
};

run();

```



## Deleting Documents (more than one)
```javascript
import { connectToDatabase, deleteDocuments } from "mongodb-operators";

const uri = process.env.MONGODB_URI || 'mongodb+srv://<username>:<password>@<cluster-address>/<database_Name>?retryWrites=true&w=majority';

const run = async() => {
    try {
        
    const data = await connectToDatabase(uri);
    console.log(data);

    const collectionName = "users";

    const schemaDefinition = {
        message: { type: String, required: true }
    };

    const filter = { message: "type your message" };

    const result = await deleteDocuments(collectionName, schemaDefinition, filter);
    console.log(result);

    } catch (error) {
        console.error('Error:', error);
    } finally {

    }
};

run();

```




## Find Queries with Limiting and Sorting with timestamp
```javascript
import { findDocument, connectToDatabase } from "mongodb-operators";

const uri = process.env.MONGODB_URI || 'mongodb+srv://<username>:<password>@<cluster-address>/<database_Name>?retryWrites=true&w=majority';

const run = async() => {
    try {
        const data = await connectToDatabase(uri);
        console.log(data)

        const collectionName = "users";

        const schemaDefinition = {
            message: { type: String, required: true }
        };

        const filter = { message: "type your message" };

        // const limit = 0 by default find all docs of specified filter

        const limit = 10 

        const order = 'ascending'

        //sorted based on timestamp
        //passing order is optional

        const result = await findDocument( collectionName, schemaDefinition, filter, limit, order)
        console.log(result)


    } catch (error) {
        console.error('Error:', error);
    } finally {

    }
};

run();

```



## Aggregation Functions/Methods for Single Collections
```javascript
import { performAggregation, connectToDatabase } from "mongodb-operators";

const uri = process.env.MONGODB_URI || 'mongodb+srv://<username>:<password>@<cluster-address>/<database_Name>?retryWrites=true&w=majority';


const run = async () => {
    try {
        const db = await connectToDatabase(uri);
        console.log("Connected to database:", db);

        const collectionName = 'users';

        const userSchema = {
            name: String,
            age: Number,
            email: { type: String, required: true, unique: true },
        };

        // Aggregation pipeline to calculate average age of users named "john"

        const aggregationPipeline = [
            { $match: { name: "john" } }, // Match documents where name is 'John'
            { $group: { _id: null, averageAge: { $avg: "$age" } } }, // Calculate average age
        ];

        // Perform aggregation using custom function

        const result = await performAggregation(collectionName, userSchema, aggregationPipeline);
        console.log("Average age of people named John:", result);

    } catch (error) {
        console.error("Error:", error);
    } finally {
    }
};

run();

```



## Aggregations Across Collections and Connecting Collections

```javascript
import { connectToDatabase, aggregateAcrossCollections, disconnectFromDatabase } from "mongodb-operators";

const uri = process.env.MONGODB_URI || 'mongodb+srv://<username>:<password>@<cluster-address>/<database_Name>?retryWrites=true&w=majority';

const run = async () => {
    try {
        const db = await connectToDatabase(uri);
        console.log("Connected to database:", db);

        // Collection names
        // Assuming Both collections have same schema
        const collection1 = 'collection1';
        const collection2 = 'collection2';

        const userSchema = {
            name: String,
            age: Number,
            email: { type: String, required: true, unique: true },
        };

        // Match conditions to filter documents
        const matchConditions = { name: "john", age: 31 };

        // Aggregation pipeline to fetch details from 'collection1' and 'collection2' collections
        const aggregationPipeline = [
            {
                $project: {
                    _id: 1,
                    name: 1,
                    age: 1,
                    email: 1,
                    collection: { $literal: collection1 }, // Adding a field to indicate collection name 'collection1'
                },
            },
            {
                $unionWith: {
                    coll: collection2, // Union with collection 'collection2'
                    pipeline: [
                        {
                            $match: matchConditions,
                        },
                        {
                            $project: {
                                _id: 1,
                                name: 1,
                                age: 1,
                                email: 1,
                                collection: { $literal: collection2 }, // Adding a field to indicate collection name 'collection2'
                            },
                        },
                    ],
                },
            },
        ];

        // Perform aggregation across collections 'collection1' and 'collection2'
        const result = await aggregateAcrossCollections({ [collection1]: userSchema, [collection2]: userSchema }, [collection1, collection2],
            matchConditions,
            aggregationPipeline
        );

        console.log("Aggregation Result:", result);

    } catch (error) {
        console.error("Error:", error);
    } finally {
    }
};

run();

```