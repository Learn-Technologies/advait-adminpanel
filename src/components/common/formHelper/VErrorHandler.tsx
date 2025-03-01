import { ErrorMessage } from "@hookform/error-message";
type IProps = {
  errors: any;
  name: string;
};
export default function VErrorHandler(props: IProps) {
  return (
    <ErrorMessage
      errors={props.errors}
      name={props.name}
      render={({ message }) => (
        <p style={{ color: "red", fontWeight: "bold" }}>/{message}</p>
      )}
    />
  );
}
