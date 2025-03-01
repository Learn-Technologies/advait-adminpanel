import { useMutation, useQuery } from "react-query";
import { Controller } from "../Controller";
import { routes } from "../../enums/apis";
// get all blog
export function useContactList() {
  return useQuery("COntact", async () => {
    let result = await Controller.get(routes.contact.getAll);
    return result;
  });
}

//  add update blog
export function useAddUpdateReceiveEmails(
  postExecution?: (data?: any) => void
) {
  return useMutation("receiveEmails", async (data?: any) => {
    const { _id } = data;
    let result;
    if (_id) {
      result = await Controller.update(routes.receiveEmails.getAll + _id, data);
    } else {
      result = await Controller.post(routes.receiveEmails.create, data);
    }
    return result;
  });
}
// delete blogs
export function useDeleteReceiveEmails(postExecution?: (data?: any) => void) {
  return useMutation("receiveEmails", async (data: any) => {
    const { _id } = data;
    if (_id) return await Controller.delete(routes.receiveEmails.getAll + _id);
  });
}
