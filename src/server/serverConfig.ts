import dotenv from "dotenv";

dotenv.config();

class ServerConfig {
  private static _getEnvVariable(name: string) {
    const envVariable = process.env[name];
    if (!envVariable) {
      throw new Error(`env variable "${name}" not found`);
    }

    return envVariable;
  }

  public readonly port: string;
  public readonly apiUrl: string;

  constructor() {
    this.port = ServerConfig._getEnvVariable("PORT");
    this.apiUrl = ServerConfig._getEnvVariable("API_URL");
  }
}

const serverConfig = new ServerConfig();

export default serverConfig;
