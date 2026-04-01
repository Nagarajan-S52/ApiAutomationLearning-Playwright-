import {test, expect} from "@playwright/test";
import { requestHandler } from "../utils/requestHandler";
import { restfulBookerBaseUrl } from "../constants/urls";
import {endpoint} from "../config/endpoint.json"


test('Get request',async({request})=>{

    const RequestHandler = new requestHandler(request);
    const response = await RequestHandler.getRequest(restfulBookerBaseUrl, endpoint.restfulBooker.Booking);
  
})
