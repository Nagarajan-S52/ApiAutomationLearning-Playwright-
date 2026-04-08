import { APIRequestContext, APIResponse } from "@playwright/test";
import { expect } from "@playwright/test";

export class RequestHandler {
  private request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async getRequest(
    baseURL: string,
    endpoint: string,
    params?: Record<string, string | number | boolean>,
    headers?: Record<string, string>,
  ): Promise<APIResponse> {
    const response = await this.request.get(`${baseURL}${endpoint}`, {
      params,
      headers,
    });

    if (!response.ok()) {
      const responseText = await response.text();
      throw new Error(
        ` GET Request ${baseURL}/${endpoint} failed: ` +
          `${response.status()} ${response.statusText()}, responseBody : ${responseText}`,
      );
    }
    return response;
  }

  async postRequest(
    baseURL: string,
    endpoint: string,
    body: object,
    headers?: Record<string, string>,
  ): Promise<APIResponse> {
    const response = await this.request.post(`${baseURL}${endpoint}`, {
      data: body,
      headers,
    });

    if (!response.ok()) {
      const responseText = await response.text();
      throw new Error(
        `POST Request ${baseURL}${endpoint} failed: ` +
          `${response.status()} ${response.statusText()} — ${responseText}`,
      );
    }

    return response;
  }

  async putRequest(
    baseURL: string,
    endpoint: string,
    body: object,
    headers?: Record<string, string>,
  ): Promise<APIResponse> {
    const response = await this.request.put(`${baseURL}${endpoint}`, {
      data: body,
      headers,
    });

    if (!response.ok()) {
      const responseText = await response.text();
      throw new Error(
        `PUT Request ${baseURL}${endpoint} failed: ` +
          `${response.status()} ${response.statusText()} — ${responseText}`,
      );
    }

    return response;
  }

  async patchRequest(
    baseURL: string,
    endpoint: string,
    body: object,
    headers?: Record<string, string>,
  ): Promise<APIResponse> {
    const response = await this.request.patch(`${baseURL}${endpoint}`, {
      data: body,
      headers,
    });

    if (!response.ok()) {
      const responseText = await response.text();
      throw new Error(
        `PATCH Request ${baseURL}${endpoint} failed: ` +
          `${response.status()} ${response.statusText()} — ${responseText}`,
      );
    }

    return response;
  }


  async deleteRequest(
    baseURL: string,
    endpoint: string,
    headers?: Record<string, string>,
  ): Promise<APIResponse> {
    const response = await this.request.delete(`${baseURL}${endpoint}`, {
      headers,
    });

    if (!response.ok()) {
      const responseText = await response.text();
      throw new Error(
        `DELETE Request ${baseURL}${endpoint} failed: ` +
          `${response.status()} ${response.statusText()} — ${responseText}`,
      );
    }

    return response;
  }
}
