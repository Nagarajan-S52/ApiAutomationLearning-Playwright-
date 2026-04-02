import { endpoints } from "../config/endpoints.json";

export class Endpoints {
  static readonly restfulBooker = {
    booking: endpoints.restfulBooker.booking,
    bookingById: endpoints.restfulBooker.bookingById,
  };
}
