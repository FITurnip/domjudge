import MysqlService from '@/services/database/MysqlService';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

// Define a type for the database configuration
type DbConfig = {
  host: string;
  user: string;
  password: string;
  database: string;
};

// Define your database configuration using environment variables
const dbConfig: DbConfig = {
  host: process.env.DB_HOST || '',
  user: process.env.DB_USER || '',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || ''
};

// Function to execute a query
const executeQuery = async (query: string, params: any[] = []): Promise<any> => {
  try {
    const results = await MysqlService.query(query, params, dbConfig);
    console.log('Query results:', results);
    return results; // Optionally return results
  } catch (error) {
    console.error('Error executing query:', error);
    throw error; // Rethrow error if needed
  }
};

// Function to execute a SELECT query
const mysqlSelect = async (table: string, columns: string[] = ['*'], where?: string, params: any[] = []): Promise<any> => {
  const sql = `SELECT ${columns.join(', ')} FROM ${table}${where ? ` WHERE ${where}` : ''}`;
  return await executeQuery(sql, params);
};

// Function to execute an INSERT query
const mysqlInsert = async (table: string, data: Record<string, any>): Promise<any> => {
  const columns = Object.keys(data).join(', ');
  const placeholders = Object.keys(data).map(() => '?').join(', ');
  const sql = `INSERT INTO ${table} (${columns}) VALUES (${placeholders})`;
  return await executeQuery(sql, Object.values(data));
};

// Function to execute an UPDATE query
const mysqlUpdate = async (table: string, data: Record<string, any>, where: string, params: any[]): Promise<any> => {
  const setClause = Object.keys(data).map(key => `${key} = ?`).join(', ');
  const sql = `UPDATE ${table} SET ${setClause} WHERE ${where}`;
  return await executeQuery(sql, [...Object.values(data), ...params]);
};

// Function to execute a DELETE query
const mysqlDelete = async (table: string, where: string, params: any[]): Promise<any> => {
  const sql = `DELETE FROM ${table} WHERE ${where}`;
  return await executeQuery(sql, params);
};

// Export the CRUD functions for use in other modules
export { executeQuery, mysqlSelect, mysqlInsert, mysqlUpdate, mysqlDelete };