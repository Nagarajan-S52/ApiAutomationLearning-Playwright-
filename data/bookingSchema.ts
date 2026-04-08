
export const postBookingSchema = {
  bookingid: "number",
  booking: {
    firstname: "string",
    lastname: "string",
    totalprice: "number",
    depositpaid: "boolean",
    bookingdates: {
      checkin: "string",
      checkout: "string",
    },
    additionalneeds: "string",
  },
};


export const getBookingSchema = {
  firstname: "string",
  lastname: "string",
  totalprice: "number",
  depositpaid: "boolean",
  bookingdates: {
    checkin: "string",
    checkout: "string",
  },
  additionalneeds: "string",
};


export const putBookingSchema = {
  firstname: "string",
  lastname: "string",
  totalprice: "number",
  depositpaid: "boolean",
  bookingdates: {
    checkin: "string",
    checkout: "string",
  },
  additionalneeds: "string",
};

export const patchBookingSchema = {
  firstname: "string",
  lastname: "string",
  totalprice: "number",
  depositpaid: "boolean",
  bookingdates: {
    checkin: "string",
    checkout: "string",
  },
  additionalneeds: "string",
};
