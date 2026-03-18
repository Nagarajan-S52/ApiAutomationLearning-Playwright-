import { test, expect, request, APIRequestContext } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { DateTime } from "luxon";

// declared outside - so all tests can access it
let apiRequest: APIRequestContext;

// runs once before all tests - creates API context
test.beforeAll("request using APIRequest (the factory)", async () => {
  apiRequest = await request.newContext({
    baseURL: "https://restful-booker.herokuapp.com/",
    extraHTTPHeaders: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Basic YWRtaW46cGFzc3dvcmQxMjM=", // required for PUT
    },
  });
});

// faker - generate random data for payload
const Firstname       = faker.person.firstName();
const Lastname        = faker.person.lastName();
const Totalprice      = faker.number.int(5000);
const Additionalneeds = faker.vehicle.vehicle();
const Depositpaid     = faker.datatype.boolean();

// luxon - generate dynamic dates
const Checkin  = DateTime.now().toFormat("yyyy-MM-dd");               // today
const Checkout = DateTime.now().plus({ days: 5 }).toFormat("yyyy-MM-dd"); // today + 5 days

// PUT request payload - data to update
const putRequestPayload = {
  firstname:       Firstname,
  lastname:        Lastname,
  totalprice:      Totalprice,
  depositpaid:     Depositpaid,
  bookingdates: {
    checkin:  Checkin,
    checkout: Checkout,
  },
  additionalneeds: Additionalneeds,
};

// ==============================
// TEST - PUT request
// ✅ using { request } fixture for GET requests
// ✅ using apiRequest factory for PUT request (needs Authorization)
// ==============================
test("Put request using the dynamic request body data", async ({ request }) => {

  // Step 1 - GET all booking ids
  const responseBodyGetBookingIds  = await request.get("/booking");
  const responseJsonGetBookingIds  = await responseBodyGetBookingIds.json();

  // Step 2 - pick random booking id from array
  const randomIndex     = Math.floor(Math.random() * responseJsonGetBookingIds.length);
  const randomBookingId = responseJsonGetBookingIds[randomIndex].bookingid;

  // Step 3 - GET booking details BEFORE update
  const responseBodyGetRandomBookingId = await request.get(`/booking/${randomBookingId}`);
  const responseJsonGetRandomBookingId = await responseBodyGetRandomBookingId.json();
  console.log("Before update :", responseJsonGetRandomBookingId);

  // Step 4 - PUT request to update the booking
  // apiRequest used here because it has Authorization header
  const putResponseBody = await apiRequest.put(`/booking/${randomBookingId}`, {
    data: putRequestPayload, // sending new data
  });
  expect(putResponseBody.status()).toBe(200); // check update success
  const putResponseJason = await putResponseBody.json();
  console.log("After update :", putResponseJason);


  // Step 5 - GET booking details AFTER update
  const responseBodyGetSingleBookingId = await request.get(`/booking/${randomBookingId}`);
  const responseJsonGetSingleBookingId = await responseBodyGetSingleBookingId.json();

  // Step 6 - Validate update was successful
  // check old data is NOT same as new data
  expect(responseJsonGetRandomBookingId).not.toMatchObject(putResponseJason);

  // check current data MATCHES updated data
  expect(responseJsonGetSingleBookingId).toMatchObject(putResponseJason);

});
