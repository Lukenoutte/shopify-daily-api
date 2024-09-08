import { promises as fs } from 'fs';
import path from 'path';
import { IFileReaderHelper } from "./@interfaces/helper.interfaces";

export default class FileReaderHelper implements IFileReaderHelper {
  #getFilePath(fileName: string): string {
    return path.join(__dirname, '../utils', fileName);
  }

  async readFile(fileName: string): Promise<string | undefined> {
    const filePath = this.#getFilePath(fileName);
    try {
      return fs.readFile(filePath, 'utf-8');
    } catch (error) {
        if (error instanceof Error)  
            throw new Error(`Error reading file ${filePath}: ${error.message}`);
    }
  }
}