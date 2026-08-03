import { TextCell } from "./TextCell";

export const ApplicableForCell = (props) => {
  const value =props.applicableForOptions.find(
      (item) => item.id === props.dataItem.applicableFor,
    )?.description || "-";

  return <TextCell {...props} value={value} />;
};
