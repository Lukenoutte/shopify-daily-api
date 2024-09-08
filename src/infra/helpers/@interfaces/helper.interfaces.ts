import { Client } from "pg";

export interface IAxiosHelper {
    get<T>(url: string, params?: any): Promise<T>;
}

export interface IFileReaderHelper {
    readFile(fileName: string): Promise<string | undefined>;
}

export interface ICronJobHelper {
    startCronJob(schedule: string, task: () => void, taskName: string): void;
}

export interface IPostgreHelper {
    uri: string;
    client: Client | null;
    clientPromise: void | null;
    connect: (uri: string) => Promise<void>;
    disconnect: () => Promise<void>;
    executeQuery: (query: string, values: any[]) => Promise<any> | undefined;
   }