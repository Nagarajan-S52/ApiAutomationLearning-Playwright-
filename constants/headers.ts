
export const HEADERS = {


  basicHeader: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },

  headerWithAuth: (): Record<string, string> => ({
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Basic YWRtaW46cGFzc3dvcmQxMjM=`,
  }),

}