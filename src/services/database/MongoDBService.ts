import { MongoClient, Db } from 'mongodb';

class MongoDBService {
  private static client: MongoClient;
  private static db: Db;

  // Static method to connect to MongoDB with dynamic configuration
  public static async connect(config: { username: string; password: string; host: string; port: string; database: string }): Promise<void> {
    const { username, password, host, port, database } = config;
    const uri = `mongodb://${username}:${password}@${host}:${port}`;

    this.client = new MongoClient(uri);

    try {
      await this.client.connect();
      console.log('Successfully connected to MongoDB');
      this.db = this.client.db(database);
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      throw error;
    }
  }

  // Static method to get the database instance
  public static getDb(): Db {
    if (!this.db) {
      throw new Error('Database connection is not established. Call connect() first.');
    }
    return this.db;
  }

  // Optional: Method to disconnect from MongoDB
  public static async disconnect(): Promise<void> {
    if (this.client) {
      await this.client.close();
      console.log('Disconnected from MongoDB');
    }
  }
}

export default MongoDBService;
