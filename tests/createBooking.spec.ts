import { test } from "../utils/fixtures";
import { expect } from "@playwright/test";
import { BaseUrl } from "../constants/urls";
import { Endpoints } from "../constants/endpoints";
import { Headers } from "../constants/headers";
import { postCreateBooking } from "../data/testData";

test("Create new booking details", async ({ apiRequest }) => {
  const response = await apiRequest.postRequest(
    BaseUrl.restfulBooker,
    Endpoints.restfulBooker.booking,
    postCreateBooking,
    Headers.basicHeader,
  );
  expect(response.status()).toBe(200);
  expect(response.statusText()).toContain("OK");

    const jsonResponse = await response.json();
  console.log(" Response --> ", jsonResponse);

  // validate bookingid
  expect(jsonResponse.bookingid).toBeDefined(); // field exists
  expect(jsonResponse.bookingid).not.toBeNull(); // not null
  expect(typeof jsonResponse.bookingid).toBe("number"); // is a number

  // validate booking fields match payload
  expect(jsonResponse.booking.firstname).toBe(postCreateBooking.firstname);
  expect(jsonResponse.booking.lastname).toBe(postCreateBooking.lastname);
  expect(jsonResponse.booking.totalprice).toBe(postCreateBooking.totalprice);
  expect(jsonResponse.booking.depositpaid).toBe(postCreateBooking.depositpaid);
  expect(jsonResponse.booking.additionalneeds).toBe(postCreateBooking.additionalneeds);

  // validate booking dates match payload
  expect(jsonResponse.booking.bookingdates.checkin).toBe(
    postCreateBooking.bookingdates.checkin,
  );
  expect(jsonResponse.booking.bookingdates.checkout).toBe(
    postCreateBooking.bookingdates.checkout,
  );
});
