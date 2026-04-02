import { faker } from "@faker-js/faker";
import { DateTime } from "luxon";

export const filterByParams = {
  byNames: {
    firstname: "Jim",
    lastname: "Brown",
  },
  byDates: {
    checkin: DateTime.now().toFormat("yyyy-MM-dd"), // today
    checkout: DateTime.now().plus({ days: 5 }).toFormat("yyyy-MM-dd"), // today + 5 days
  },
};

export const createBooking = {
  firstname: faker.person.firstName("male"),
  lastname: faker.person.lastName("male"),
  totalprice: faker.number.int(1000),
  depositpaid: faker.datatype.boolean(),
  bookingdates: {
    checkin: DateTime.now().toFormat("yyyy-MM-dd"),
    checkout: DateTime.now().plus({ days: 5 }).toFormat("yyyy-MM-dd"),
  },
  additionalneeds: faker.book.title(),
};

export const updateBooking = {
  firstname: faker.person.firstName("female"),
  lastname: faker.person.lastName("female"),
  totalprice: faker.number.int(500),
  depositpaid: faker.datatype.boolean(),
  bookingdates: {
    checkin: DateTime.now().plus({ days: 5 }).toFormat("yyyy-MM-dd"),
    checkout: DateTime.now().toFormat("yyyy-MM-dd"),
  },
  additionalneeds: faker.book.author(),
};