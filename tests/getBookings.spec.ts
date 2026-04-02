import { test } from "../utils/fixtures";
import { expect } from "@playwright/test";
import { BaseUrl } from "../constants/urls";
import { Endpoints } from "../constants/endpoints";
import { filterByParams } from "../data/testData";
import {Headers} from "../constants/headers"


let lastBookingId: number;

test("Get all booking ids by filter using Name Params", async ({ apiRequest }) => {

  const response = await apiRequest.getRequest(
    BaseUrl.restfulBooker,
    Endpoints.restfulBooker.booking,
    {
      firstname: filterByParams.byNames.firstname,
      lastname: filterByParams.byNames.lastname,
    },
    Headers.basicHeader,
  );
  expect(response.status()).toBe(200);
  expect(response.statusText()).toContain('OK')

  const jsonResponse = await response.json();
  console.log(" Response --> ", jsonResponse);

   lastBookingId = jsonResponse[jsonResponse.length - 1].bookingid;
   console.log("Last Booking id = ", lastBookingId);
 
});


test("Get booking details from specific id", async ({
  apiRequest,
}) => {
  const response = await apiRequest.getRequest(
    BaseUrl.restfulBooker,
    `${Endpoints.restfulBooker.booking}/${lastBookingId}`,
    Headers.basicHeader,
  );
  expect(response.status()).toBe(200);
  expect(response.statusText()).toContain("OK");

  const jsonResponse = await response.json();
  console.log(" Response --> ", jsonResponse);

   expect(jsonResponse.firstname).toMatch(filterByParams.byNames.firstname);
   expect(jsonResponse.lastname).toMatch(filterByParams.byNames.lastname); 
});