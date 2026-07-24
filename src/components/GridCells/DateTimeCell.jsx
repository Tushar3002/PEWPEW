const DateTimeCell = ({
  dataItem,
  tdProps,
  dateField = "eventDate",
  startTimeField = "startTime",
  endTimeField = "endTime",
  showEndedMessage = false,
}) => {
  const eventDate = dataItem[dateField]
    ? new Date(`${dataItem[dateField]}Z`)
    : null;

  const startTime = dataItem[startTimeField]
    ? new Date(`${dataItem[startTimeField]}Z`)
    : null;

  const endTime = dataItem[endTimeField]
    ? new Date(`${dataItem[endTimeField]}Z`)
    : null;

  const formattedDate = eventDate?.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formattedStartTime = startTime?.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const formattedEndTime = endTime?.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <td {...tdProps}>
      <div>{formattedDate || "-"}</div>

      <div>
        {formattedStartTime || "-"} - {formattedEndTime || "-"}
      </div>

      {showEndedMessage && <div>This Event has ended</div>}
    </td>
  );
};

export default DateTimeCell;