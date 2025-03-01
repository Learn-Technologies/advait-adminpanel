import VUtils from "../VUtils";

export class VErrorFormatter {
  static async mongoErrFormat(errMsg: string) {
    if (errMsg.includes("duplicate key error collection"))
      return await VUtils.toastAlert("Please provide unique title.");
    return await VUtils.toastAlert(errMsg);
  }
}
