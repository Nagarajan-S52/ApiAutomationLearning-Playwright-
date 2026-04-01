import { APIRequestContext, APIResponse } from "@playwright/test";
import { test } from "@playwright/test";

export class requestHandler {
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
     const responseObject = await this.request.get(`${baseURL}${endpoint}`, {
       params: params,
       headers: headers,
     });

     const responseJSON = await responseObject.json();

     return responseJSON;
  }
}