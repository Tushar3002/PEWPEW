import { TextCell } from "./TextCell";

  export const PhoneCell = (props) => {
  const { countryCode, phone } = props.dataItem;

  return (
    <TextCell
      {...props}
      value={`(${countryCode}) ${phone}`}
    />
  
  );
};
