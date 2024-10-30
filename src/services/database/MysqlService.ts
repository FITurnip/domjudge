import mysql from 'mysql2';

// Define a type for the database configuration
type DbConfig = {
  host: string;
  user: string;
  password: string;
  database: string;
};

class MysqlService {
  // Static method to establish and return a MySQL connection with dynamic parameters
  static getConnection(config: DbConfig): mysql.Connection {
    const connection = mysql.createConnection(config);
    connection.connect((err: any) => {
      if (err) {
        console.error('Error connecting:', err.stack);
      } else {
        console.log('Connected to the database with id:', connection.threadId);
      }
    });
    return connection;
  }

  // Static method for executing a query, allowing passing of configuration
  static async query(sql: string, params: any[] = [], config: DbConfig): Promise<any> {
    return new Promise((resolve, reject) => {
      const connection = this.getConnection(config) as any;
      connection.query(sql, params, (error: any, results: any) => {
        connection.end();
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    });
  }
}

export default MysqlService;
