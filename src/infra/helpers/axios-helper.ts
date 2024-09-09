import axios, { AxiosResponse } from "axios";
import { IAxiosHelper } from "./@interfaces/helper.interfaces";

export default class AxiosHelper implements IAxiosHelper {
  async get<T>(url: string, params?: unknown): Promise<T> {
    try {
      const response: AxiosResponse<T> = await axios.get(url, {
        params,
        timeout: 5000,
      });
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching data from ${url}: ${error}`);
    }
  }
}
