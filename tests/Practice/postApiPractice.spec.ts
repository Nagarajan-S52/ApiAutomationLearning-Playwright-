import { test, request, expect, APIRequestContext } from "@playwright/test";

test("Post request Using APIRequestContext (request fixture)", async ({
  request,
}) => {
  const response = await request.post("/booking", {
    data: {
      firstname: "Naresh",
      lastname: "Kumar",
      totalprice: 1111,
      depositpaid: true,
      bookingdates: {
        checkin: "2026-01-01",
        checkout: "2026-04-01",
      },
      additionalneeds: "Demo Post Request",
    },
  });

  expect(response.status()).toBe(200);
  const jsonResponse = await response.json();
  expect(jsonResponse.bookingid).toBeDefined();
  expect(jsonResponse.bookingid).not.toBeNull();
});

function getDate(offsetDays: number = 0): string {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays);
  return date.toISOString().split("T")[0];
}

let apiRequest: APIRequestContext;

test.beforeAll(" beforeAll test  Using APIRequest (the factory)", async () => {
  apiRequest = await request.newContext({
    baseURL: "https://restful-booker.herokuapp.com/",
    extraHTTPHeaders: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
});

test("Post request Using APIRequest (the factory)", async () => {
  const payload = {
    firstname: "Naresh",
    lastname: "Kumar",
    totalprice: 256,
    depositpaid: true,
    bookingdates: {
      checkin: getDate(-7),
      checkout: getDate(),
    },
    additionalneeds: "Playing mobile games",
  };

  const response = await apiRequest.post("/booking", { data: payload });

  expect(response.status()).toBe(200);
  const jsonResponse = await response.json();

  expect(jsonResponse.bookingid).toBeDefined();
  expect(jsonResponse.bookingid).not.toBeNull();
  expect(typeof jsonResponse.bookingid).toBe("number");
  expect(jsonResponse.booking.firstname).toBe(payload.firstname);
  expect(jsonResponse.booking.lastname).toBe(payload.lastname);
  expect(jsonResponse.booking.totalprice).toBe(payload.totalprice);
  expect(jsonResponse.booking.depositpaid).toBe(payload.depositpaid);
  expect(jsonResponse.booking.additionalneeds).toBe(payload.additionalneeds);

  expect(jsonResponse.booking.bookingdates.checkin).toBe(
    payload.bookingdates.checkin,
  );
  expect(jsonResponse.booking.bookingdates.checkout).toBe(
    payload.bookingdates.checkout,
  );
 });

test.afterAll(async () => {
  await apiRequest.dispose();
});
