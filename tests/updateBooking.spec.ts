import { test } from "../utils/fixtures";
import { expect } from "@playwright/test";
import { BaseUrl } from "../constants/urls";
import { Endpoints } from "../constants/endpoints";
import { HEADERS } from "../constants/headers";
import { filterByParams } from "../data/testData";
import { updateBooking } from "../data/testData";
import { putBookingSchema } from "../data/bookingSchema";
import { validateSchema } from "../utils/validateHelper";
import { expectedStatus } from "../constants/statusCodes";

test("Update the booking details", async ({ apiRequest }) => {
  const getResponse = await apiRequest.getRequest(
    BaseUrl.restfulBooker,
    Endpoints.restfulBooker.booking,
    expectedStatus.OK,
    {
      firstname: filterByParams.firstname,
      lastname: filterByParams.lastname,
    },
    HEADERS.basicHeader,
  );

  const getJsonResponse = await getResponse.json();
  const lastBookingId = getJsonResponse[getJsonResponse.length - 1].bookingid;

  const putResponse = await apiRequest.putRequest(
    BaseUrl.restfulBooker,
    `${Endpoints.restfulBooker.booking}/${lastBookingId}`,
    updateBooking,
    expectedStatus.OK,
    HEADERS.headerWithAuth(),
  );

  expect(putResponse.status()).toBe(200);
  expect(putResponse.statusText()).toContain("OK");

  const putJsonResponse = await putResponse.json();

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
