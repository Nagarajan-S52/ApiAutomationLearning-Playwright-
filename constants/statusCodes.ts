

export const expectedStatus = {
  // ── 2xx — Success ─────────────────────────────
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,

  // ── 4xx — Client Errors ───────────────────────
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,

  // ── 5xx — Server Errors ───────────────────────
  SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  UNAVAILABLE: 503,
};
