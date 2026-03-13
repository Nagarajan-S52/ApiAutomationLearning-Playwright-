import { test, request, expect } from "@playwright/test";

test.beforeAll("beforeall test for request 3 ", async () => {
  const reqcontext = await request.newContext({
    baseURL: "https://restful-booker.herokuapp.com",
    extraHTTPHeaders: {
      Accept: "application / json",
    },
    
  });


});



// Get ApI request using the request: APIRequestContext

test("Get request 1 using the request: APIRequestContext", async ({
  request,
}) => {
  const rsp1 = await request.get(
    "https://restful-booker.herokuapp.com/booking",
  );

  console.log("response =", await rsp1.json());
});
 
// Get ApI request using the request: APIRequest

test(" Get Request 2 using the request: APIRequest", async () => {

    const reqcontext = await request.newContext({
      baseURL: "https://restful-booker.herokuapp.com",
    });

   const response = await reqcontext.get('/booking');
   expect(response.status()).toBe(200);

});

test(" Get Request 3 using the request: APIRequest", async () => {
  const reqcontext = await request.newContext({
    baseURL: "https://restful-booker.herokuapp.com",
  });

  const response = await reqcontext.get("/booking");
  expect(response.status()).toBe(200);
});

