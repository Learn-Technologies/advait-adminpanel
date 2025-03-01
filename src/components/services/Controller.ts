import { dbConfig } from "@/config";
import HttpService from "./HttpService";

export class Controller {
  static async get(path: string) {
    let result = await HttpService.get(`${dbConfig.API_URL}${path}`);
    return result.data;
  }
  static async post(path: string, data: any) {
    let rs = await HttpService.post(`${dbConfig.API_URL}${path}`, data);
    return rs;
  }

  static async update(path: string, data: any) {
    let rs = await HttpService.put(`${dbConfig.API_URL}${path}`, data);
    return rs;
  }

  static async delete(path: string, data?: any) {
    let rs = await HttpService.delete(`${dbConfig.API_URL}${path}`, data);
    return rs;
  }
}
