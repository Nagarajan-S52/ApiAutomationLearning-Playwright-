import { test } from "../utils/fixtures";
import { expect } from "@playwright/test";
import { BaseUrl } from "../constants/urls";
import { Endpoints } from "../constants/endpoints";
import { HEADERS } from "../constants/headers";
import { createBooking } from "../data/testData";
import { postBookingSchema } from "../data/bookingSchema";
import { validateSchema } from "../utils/validateHelper";
import { expectedStatus } from "../constants/statusCodes";

test("Create new booking details", async ({ apiRequest }) => {
  const response = await apiRequest.postRequest(
    BaseUrl.restfulBooker,
    Endpoints.restfulBooker.booking,
    createBooking,
    expectedStatus.OK,
    HEADERS.basicHeader,
  );
  expect(response.status()).toBe(200);
  expect(response.statusText()).toContain("OK");

  const jsonResponse = await response.json();

  validateSchema(jsonResponse, postBookingSchema);

  // validate bookingid
  expect(jsonResponse.bookingid).toBeDefined(); // field exists
  expect(jsonResponse.bookingid).not.toBeNull(); // not null
  expect(typeof jsonResponse.bookingid).toBe("number"); // is a number

  // validate booking fields match payload
  expect(jsonResponse.booking.firstname).toBe(createBooking.firstname);
  expect(jsonResponse.booking.lastname).toBe(createBooking.lastname);
  expect(jsonResponse.booking.totalprice).toBe(createBooking.totalprice);
  expect(jsonResponse.booking.depositpaid).toBe(createBooking.depositpaid);
  expect(jsonResponse.booking.additionalneeds).toBe(
    createBooking.additionalneeds,
  );

  // validate booking dates match payload
  expect(jsonResponse.booking.bookingdates.checkin).toBe(
    createBooking.bookingdates.checkin,
  );
  expect(jsonResponse.booking.bookingdates.checkout).toBe(
    createBooking.bookingdates.checkout,
  );
});
