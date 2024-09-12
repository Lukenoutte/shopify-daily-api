import { promises as fs } from "fs";
import path from "path";
import { IFileReaderHelper } from "./@interfaces/helper.interfaces";
import { nodeEnv } from "main/configs/env";

export default class FileReaderHelper implements IFileReaderHelper {
  #getFilePath(fileName: string): string {
    const pathUtils = nodeEnv === "dev" ? "../utils" : "../infra/utils";
    return path.join(__dirname, pathUtils, fileName);
  }

  async readFile(fileName: string): Promise<string> {
    const filePath = this.#getFilePath(fileName);
    try {
      return fs.readFile(filePath, "utf-8");
    } catch (error) {
      if (error instanceof Error)
        throw new Error(`Error reading file ${filePath}: ${error.message}`);
      throw new Error(`Error reading file ${filePath}`);
    }
  }
}
