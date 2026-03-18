import { test, request, expect, APIRequestContext } from "@playwright/test";

// ==============================
// helper function to get dynamic dates
// offsetDays = 0  → today
// offsetDays = -7 → 7 days before today
// offsetDays = 5  → 5 days after today
// ==============================
function getDate(offsetDays: number = 0): string {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays); // add or subtract days
  return date.toISOString().split("T")[0];   // return only date part → "2026-03-18"
}

// ==============================
// TEST 1 - POST using { request } fixture
// ✅ baseURL auto taken from playwright.config.ts
// ✅ no manual context creation needed
// ==============================
test("Post request Using APIRequestContext (request fixture)", async ({ request }) => {

  // POST /booking with static payload
  const response = await request.post("/booking", {
    data: {
      firstname:       "Naresh",
      lastname:        "Kumar",
      totalprice:      1111,
      depositpaid:     true,
      bookingdates: {
        checkin:  "2026-01-01",
        checkout: "2026-04-01",
      },
      additionalneeds: "Demo Post Request",
    },
  });

  expect(response.status()).toBe(200); // check success

  const jsonResponse = await response.json();

  // check bookingid exists in response
  expect(jsonResponse.bookingid).toBeDefined(); // field exists
  expect(jsonResponse.bookingid).not.toBeNull(); // not null

});

// declared outside - so all tests can access it
let apiRequest: APIRequestContext;

// runs once before all tests - creates API context
test.beforeAll("beforeAll test Using APIRequest (the factory)", async () => {
  apiRequest = await request.newContext({
    baseURL: "https://restful-booker.herokuapp.com/",
    extraHTTPHeaders: {
      Accept:         "application/json",
      "Content-Type": "application/json",
    },
  });
});

// runs once after all tests - free up memory
test.afterAll(async () => {
  await apiRequest.dispose();
});

// ==============================
// TEST 2 - POST using APIRequest factory
// ✅ manually created apiRequest context
// ✅ dynamic dates using getDate() helper
// ✅ more detailed assertions on response
// ==============================
test("Post request Using APIRequest (the factory)", async () => {

  // dynamic payload using getDate() helper
  const payload = {
    firstname:       "Naresh",
    lastname:        "Kumar",
    totalprice:      256,
    depositpaid:     true,
    bookingdates: {
      checkin:  getDate(-7), // 7 days before today → "2026-03-11"
      checkout: getDate(),   // today               → "2026-03-18"
    },
    additionalneeds: "Playing mobile games",
  };

  // POST /booking with dynamic payload
  const response = await apiRequest.post("/booking", { data: payload });

  expect(response.status()).toBe(200); // check success

  const jsonResponse = await response.json();
  // response looks like →
  // {
  //   bookingid: 123,
  //   booking: {
  //     firstname: "Naresh",
  //     lastname: "Kumar", ...
  //   }
  // }

  // validate bookingid
  expect(jsonResponse.bookingid).toBeDefined();          // field exists
  expect(jsonResponse.bookingid).not.toBeNull();         // not null
  expect(typeof jsonResponse.bookingid).toBe("number");  // is a number

  // validate booking fields match payload
  expect(jsonResponse.booking.firstname).toBe(payload.firstname);
  expect(jsonResponse.booking.lastname).toBe(payload.lastname);
  expect(jsonResponse.booking.totalprice).toBe(payload.totalprice);
  expect(jsonResponse.booking.depositpaid).toBe(payload.depositpaid);
  expect(jsonResponse.booking.additionalneeds).toBe(payload.additionalneeds);

  // validate booking dates match payload
  expect(jsonResponse.booking.bookingdates.checkin).toBe(payload.bookingdates.checkin);
  expect(jsonResponse.booking.bookingdates.checkout).toBe(payload.bookingdates.checkout);

});
