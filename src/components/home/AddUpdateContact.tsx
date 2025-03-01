type IProps = {
  refechList?: Function;
  isObjItem?: Object | null;
  setObjItem?: (isObjItem: Object | null) => void;
};

export default function AddUpdateContact(props: IProps) {
  return (
    <div>
      <h1>You cant create a contact..</h1>
    </div>
  );
}
