import { test as base } from "@playwright/test";
import {RequestHandler} from "../utils/requestHandler";

type apiFixture = {
  apiRequest: RequestHandler;
};


export const test = base.extend<apiFixture>({

apiRequest: async({request}, use)=> {

     const handler = new RequestHandler(request);

     await use(handler);
}


});