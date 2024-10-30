import MongoDBService from '@/services/database/MongoDBService'; // Adjust the path as necessary
import dotenv from 'dotenv';

dotenv.config();

// Define a type for the MongoDB document
type DocumentType = {
  [key: string]: any;
};

// MongoDB configuration using environment variables
const mongoConfig = {
  username: process.env.DB_USERNAME || '',
  password: process.env.DB_PASSWORD || '',
  host: process.env.DB_HOST || '',
  port: process.env.DB_PORT || '',
  database: process.env.DB_DATABASE || ''
};

// Connect to MongoDB with the loaded configuration
(async () => {
  await MongoDBService.connect(mongoConfig);
})();

// Helper function to execute a query with error handling
const executeQuery = async (operation: () => Promise<any>): Promise<any> => {
  try {
    return await operation();
  } catch (error) {
    console.error('Error executing query:', error);
    throw error;
  }
};

// Function to execute a SELECT query (find)
const mongoSelect = async (collectionName: string, query: DocumentType = {}, options: DocumentType = {}): Promise<any> => {
  const db = MongoDBService.getDb();
  return await executeQuery(() => db.collection(collectionName).find(query, options).toArray());
};

// Function to execute an INSERT query (insertOne)
const mongoInsert = async (collectionName: string, data: DocumentType): Promise<any> => {
  const db = MongoDBService.getDb();
  return await executeQuery(() => db.collection(collectionName).insertOne(data));
};

// Function to execute an UPDATE query (updateMany)
const mongoUpdate = async (collectionName: string, query: DocumentType, update: DocumentType, options: DocumentType = {}): Promise<any> => {
  const db = MongoDBService.getDb();
  return await executeQuery(() => db.collection(collectionName).updateMany(query, { $set: update }, options));
};

// Function to execute a DELETE query (deleteMany)
const mongoDelete = async (collectionName: string, query: DocumentType): Promise<any> => {
  const db = MongoDBService.getDb();
  return await executeQuery(() => db.collection(collectionName).deleteMany(query));
};

// Export the CRUD functions for use in other modules
export { executeQuery, mongoSelect, mongoInsert, mongoUpdate, mongoDelete };