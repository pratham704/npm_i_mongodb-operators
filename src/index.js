import { connectToDatabase, disconnectFromDatabase, checkConnectionStatus } from "./config/db.js";
import { createCollection } from "./services/collection/createCollection.js";
import { deleteCollection } from "./services/collection/deleteCollection.js"
import { createDocument } from "./services/document/unit/createDoc.js";
import { deleteDocument } from "./services/document/unit/deleteDoc.js"
import { updateDocument } from "./services/document/unit/updateDoc.js"
import { deleteDocuments } from "./services/document/modular/deleteDocs.js"
import { updateDocuments } from "./services/document/modular/updateDocs.js"
import { findDocument } from "./services/operations/Query/findQuery.js";
import { performAggregation } from "./services/operations/Aggregation/singularCollection.js";
import { aggregateAcrossCollections } from "./services/operations/Aggregation/aggregateAcrossCollections.js";

export {
    connectToDatabase,
    disconnectFromDatabase,
    checkConnectionStatus,
    createCollection,
    deleteCollection,
    createDocument,
    deleteDocument,
    updateDocument,
    deleteDocuments,
    updateDocuments,
    findDocument,
    performAggregation,
    aggregateAcrossCollections
};