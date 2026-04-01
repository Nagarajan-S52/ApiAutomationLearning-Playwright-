import { APIRequestContext, APIResponse } from "@playwright/test";
import { expect } from "@playwright/test";

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
    const response = await this.request.get(`${baseURL}${endpoint}`, {
      params: params,
      headers: headers,
    });

 if (!response.ok()) {
   const responseText = await response.text();
   throw new Error(
     `${baseURL}/${endpoint} failed: ` +
       `${response.status()} ${response.statusText()}, responseBody : ${responseText}`,
   );
 }
   return response;
  }
}
