import { test } from "../utils/fixtures";
import { expect } from "@playwright/test";
import { BaseUrl } from "../constants/urls";
import { Endpoints } from "../constants/endpoints";
import { filterByParams } from "../data/testData";
import { Headers } from "../constants/headers";
import { getBookingSchema } from "../data/bookingSchema";
import { validateSchema } from "../utils/validateHelper";


test("Get all booking ids by filter using Name Params and Get booking details from specific id ", async ({
  apiRequest,
}) => {
  const response = await apiRequest.getRequest(
    BaseUrl.restfulBooker,
    Endpoints.restfulBooker.booking,
    {
      firstname: filterByParams.firstname,
      lastname: filterByParams.lastname,
    },
    Headers.basicHeader,
  );
  expect(response.status()).toBe(200);
  expect(response.statusText()).toContain("OK");

  const jsonResponse = await response.json();
  console.log(" Response --> ", jsonResponse);

  const lastBookingId = jsonResponse[jsonResponse.length - 1].bookingid;
  console.log("Last Booking id = ", lastBookingId);

   const getResponse = await apiRequest.getRequest(
     BaseUrl.restfulBooker,
     `${Endpoints.restfulBooker.booking}/${lastBookingId}`,
     Headers.basicHeader,
   );
   expect(getResponse.status()).toBe(200);
   expect(getResponse.statusText()).toContain("OK");

   const getJsonResponse = await getResponse.json();
   console.log(" Get Response --> ", getJsonResponse);

   validateSchema(getJsonResponse, getBookingSchema);
   expect(getJsonResponse.firstname).toMatch(filterByParams.firstname);
   expect(getJsonResponse.lastname).toMatch(filterByParams.lastname);
});

