export interface IAxiosHelper {
    get<T>(url: string, params?: any): Promise<T>;
}

export interface IFileReaderHelper {
    readFile(fileName: string): Promise<string | undefined>;
}

export interface ICronJobHelper {
    startCronJob(schedule: string, task: () => void, taskName: string): void;
}