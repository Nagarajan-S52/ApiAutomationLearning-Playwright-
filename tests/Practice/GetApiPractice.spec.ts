import { test, request, APIRequestContext, expect } from "@playwright/test";

// declared outside - so all tests can access it
let apiRequest: APIRequestContext;

// ==============================
// Runs ONCE before all tests
// creates API context with base config
// ==============================
test.beforeAll("Using APIRequest (the factory)", async () => {
  apiRequest = await request.newContext({
    baseURL: "https://restful-booker.herokuapp.com",
    extraHTTPHeaders: {
      Accept: "application/json", // expect JSON response
    },
  });
});

// Runs ONCE after all tests - free up memory
test.afterAll(async () => {
  await apiRequest.dispose();
});

// ==============================
// TEST 1 - Using APIRequest (the factory)
// NOT using { request } fixture
// using manually created "apiRequest" context
// baseURL & headers set manually in beforeAll
// ==============================
test("Get request using APIRequest (the factory)", async () => {
//                                                  ↑
//                                     no { request } fixture here!
//                                     uses "apiRequest" created in beforeAll

  // GET /booking?firstname=Jim&lastname=Brown
  const responsobject = await apiRequest.get("/booking", {
    params: {
      firstname: "Jim",
      lastname: "Brown",
    },
  });

  // 200 = success
  expect(responsobject.status()).toBe(200);

  // convert response to JSON
  const responseBody = await responsobject.json();
  console.log("whole body = ", responseBody);
  // → [{ bookingid: 284 }, { bookingid: 56 }...]

  // get last booking id from array
  let lastBookingId = responseBody[responseBody.length - 1].bookingid;
  console.log("Last Booking id = ", lastBookingId);
  // → 597

});

// ==============================
// TEST 2 - Using { request } fixture
// using { request } fixture from Playwright
// baseURL auto picked from playwright.config.ts
// no manual context creation needed
// ==============================
test("Using APIRequestContext", async ({ request }) => {
//                                        ↑
//                           { request } fixture injected by Playwright
//                           automatically uses config from playwright.config.ts

  // Step 1 - GET /booking?firstname=Jim&lastname=Brown
  const responsObj1 = await request.get("/booking", {
    params: {
      firstname: "Jim",
      lastname: "Brown",
    },
  });

  // 200 = success
  expect(responsObj1.status()).toBe(200);

  // convert response to JSON
  // → [{ bookingid: 284 }, { bookingid: 56 }...]
  const responseBdy1 = await responsObj1.json();
  console.log("whole body = ", responseBdy1);

  // get first booking id from array
  let firstBookingId = responseBdy1[0].bookingid;
  // → 284

  // Step 2 - GET /booking/284 using id from step 1
  const responsObject2 = await request.get(`/booking/${firstBookingId}`);

  // 200 = success
  expect(responsObject2.status()).toBe(200);

  // convert response to JSON
  // → { firstname: "Jim", lastname: "Brown", totalprice: 500 ... }
  const responseBody2 = await responsObject2.json();
  console.log("Single Booking = ", responseBody2);

  // validate response fields
  expect(responseBody2.firstname).toMatch("Jim");   // check firstname
  expect(responseBody2.lastname).toMatch("Brown");  // check lastname

});