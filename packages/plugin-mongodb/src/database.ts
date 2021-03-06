import mongoose, { Connection } from 'mongoose';

interface IMongoDatabaseConfig {
  uri: string;
}

export class MongoDatabase {
  public client: typeof mongoose | null = null;
  public connection: Connection | null = null;
  public config: IMongoDatabaseConfig;
  constructor(config: IMongoDatabaseConfig) {
    this.config = config;
  }

  async start() {
    this.client = await mongoose.connect(this.config.uri, { useNewUrlParser: true, useUnifiedTopology: true });
    this.connection = this.client.connection;
  }
  async stop() {
    this.connection?.close();
  }
}
