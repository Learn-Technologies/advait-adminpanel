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
        <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
          <span className="font-bold italic mr-1">!</span>
          {message}
        </p>
      )}
    />
  );
}
