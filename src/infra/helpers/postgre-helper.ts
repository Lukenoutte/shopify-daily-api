/* eslint-disable @typescript-eslint/no-explicit-any */
import { Client, QueryResult } from "pg";
import { IPostgreHelper } from "./@interfaces/helper.interfaces";

const postgreHelper: IPostgreHelper = {
  uri: "",
  client: null,
  clientPromise: null,
  async connect(uri: string): Promise<void> {
    this.uri = uri;
    this.client = new Client(uri);
    this.clientPromise = await this.client.connect();
  },

  async disconnect(): Promise<void> {
    if (!this.client) return;
    await this.client.end();
    this.client = null;
    this.clientPromise = null;
  },

  executeQuery(query: string, values: unknown[]): Promise<QueryResult<any>> {
    if (!this.client)
      throw new Error("Pg Client not initialized [PostgreHelper]");
    return this.client.query(query, values);
  },
};

export default postgreHelper;
