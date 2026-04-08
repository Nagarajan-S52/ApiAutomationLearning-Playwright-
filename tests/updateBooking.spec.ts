import { test } from "../utils/fixtures";
import { expect } from "@playwright/test";
import { BaseUrl } from "../constants/urls";
import { Endpoints } from "../constants/endpoints";
import { Headers } from "../constants/headers";
import { filterByParams } from "../data/testData";
import { updateBooking } from "../data/testData";
import { putBookingSchema } from "../data/bookingSchema";
import { validateSchema } from "../utils/validateHelper";

test("Update the booking details", async ({ apiRequest }) => {
  const getResponse = await apiRequest.getRequest(
    BaseUrl.restfulBooker,
    Endpoints.restfulBooker.booking,
    {
      firstname: filterByParams.firstname,
      lastname: filterByParams.lastname,
    },
    Headers.basicHeader,
  );

  const getJsonResponse = await getResponse.json();
  const lastBookingId = getJsonResponse[getJsonResponse.length - 1].bookingid;
  console.log("Last Booking id = ", lastBookingId);

  const putResponse = await apiRequest.putRequest(
    BaseUrl.restfulBooker,
    `${Endpoints.restfulBooker.booking}/${lastBookingId}`,
    updateBooking,
    Headers.headerWithAuth(),
  );

  expect(putResponse.status()).toBe(200);
  expect(putResponse.statusText()).toContain("OK");

  const putJsonResponse = await putResponse.json();
  console.log(" Response --> ", putJsonResponse);

  validateSchema(putJsonResponse, putBookingSchema);
  // validate update booking fields match payload
  expect(putJsonResponse.firstname).toBe(updateBooking.firstname);
  expect(putJsonResponse.lastname).toBe(updateBooking.lastname);
  expect(putJsonResponse.totalprice).toBe(updateBooking.totalprice);
  expect(putJsonResponse.depositpaid).toBe(updateBooking.depositpaid);
  expect(putJsonResponse.additionalneeds).toBe(updateBooking.additionalneeds);

  // validate Update booking dates match payload
  expect(putJsonResponse.bookingdates.checkin).toBe(
    updateBooking.bookingdates.checkin,
  );
  expect(putJsonResponse.bookingdates.checkout).toBe(
    updateBooking.bookingdates.checkout,
  );
});
