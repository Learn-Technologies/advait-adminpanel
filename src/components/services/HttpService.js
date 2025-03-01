import { VErrorFormatter } from "../common/helpers/VErrorFormatter";

export default class HttpService {
  static async get(url, token) {
    let headers = {};
    if (token) headers.Authorization = `Bearer ${token}`;
    let intermidiate = await fetch(url, { headers });
    let result = await intermidiate.json();
    if (!result.status) {
      throw new Error(result.message);
    }
    return result;
  }

  static async post(url, data, token) {
    let headers = {
      "Content-Type": "application/json",
    };
    if (token) headers.Authorization = `Bearer ${token}`;
    let intermidiate = await fetch(url, {
      headers,
      body: JSON.stringify(data),
      method: "POST",
    });
    let result = await intermidiate.json();
    if (!result.status) {
      await VErrorFormatter.mongoErrFormat(result.msg);
      throw new Error(result.msg);
    }
    return result;
  }
  static async put(url, data, token) {
    let headers = {
      "Content-Type": "application/json",
    };
    if (token) headers.Authorization = `Bearer ${token}`;
    let intermidiate = await fetch(url, {
      headers,
      body: JSON.stringify(data),
      method: "PUT",
    });
    let result = await intermidiate.json();
    if (!result.status) {
      throw new Error(result.message);
    }
    return result;
  }

  static async delete(url, data, token) {
    let headers = {
      "Content-Type": "application/json",
    };
    if (token) headers.Authorization = `Bearer ${token}`;
    let intermidiate = await fetch(url, {
      headers,
      body: JSON.stringify(data),
      method: "DELETE",
    });
    let result = await intermidiate.json();
    if (!result.status) {
      throw new Error(result.message);
    }
    return result;
  }
}
