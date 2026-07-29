import { Breadcrumb } from "@progress/kendo-react-layout";
import { SvgIcon } from "@progress/kendo-react-common";
import { divideIcon } from "@progress/kendo-svg-icons";
import { useNavigate } from "react-router-dom";
import "./Breadcrumbs.css";

const CustomDelimiter = () => {
  return <SvgIcon icon={divideIcon} />;
};

const Breadcrumbs = ({ items }) => {
  const navigate = useNavigate();

  const handleItemSelect = (event) => {
    const selectedItem = items.find(
      (item) => item.id === event.id
    );

    if (selectedItem?.path) {
      navigate(selectedItem.path);
    }
  };

  return (
    <div className={items.length === 1 ? "single-breadcrumb" : ""}>
      <Breadcrumb
        className="custom-breadcrumb"
        data={items}
        breadcrumbDelimiter={CustomDelimiter}
        onItemSelect={handleItemSelect}
      />
    </div>
  );
};

export default Breadcrumbs;