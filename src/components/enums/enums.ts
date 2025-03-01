const enums = {
  siteName: "Advait Capital & Investments",
  ALERT_TYPE: {
    SUCCESS: "SUCCESS",
    ERROR: "ERROR",
    INFO: "INFO",
    WARNING: "WARNING",
  },
  staticLink: {
    LINK: "/",
  },
  POST_PER_PAGE: {
    PAGE_NO: 10,
  },

  formioURL: "http://localhost:3001/",
};
export default enums;

export const orderStatusColor = {
  PENDING: { status: "Pending", color: "#A3A000" },
  READY_TO_ACCEPT: { status: "Ready To Accept", color: "#A3A000" },
  ACCEPTED: { status: "Accepted", color: "#002A86" },
  DISPATCHED: { status: "Dispatched", color: "#E76500" },
  OUT_FOR_DELIVERY: { status: "Out For Delivery", color: "#E76500" },
  DELIVERED: { status: "Delivered", color: "#1E592F" },
  DELIVERY_REJECTED: { status: "Delivery Rejected", color: "#1E592F" },
  CANCELLED: { status: "Cancelled", color: "#840606" },
  RETURNED: { status: "Returned", color: "#c7362c" },
  RETURN_REQUESTED: { status: "Returned Requested", color: "#c7362c" },
  RETURN_ACCEPTED: { status: "Returned Accepted", color: "#c7362c" },
  REJECTED: { status: "Returned Accepted", color: "#c7362c" },
};
