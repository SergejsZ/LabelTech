interface ActionProps {
  setDate: any;
  date: any;
  selectRange: boolean;
  setSelectRange: any;
}
const Actions = (props: ActionProps) => {
  const { setDate, date, selectRange, setSelectRange } = props;
  return (
    <div>
      {/* {date.length > 0 && selectRange ? (
        <p className="text-center">
          {date[0].toDateString()}
          &nbsp;-&nbsp;
          {date[1].toDateString()}
        </p>
      ) : (
        <p className="text-center">{date.toDateString()}</p>
      )} */}
      {/* <button
        style={{
          color: selectRange ? "#6f48eb" : "#524d4d",
          cursor: "pointer",
          marginTop: "1rem",
          width: "10rem",
          height: "3rem",
          border: "none",
          outline: "none",
          fontSize: "1rem",
          fontWeight: "bold",
          borderRadius: "0.5rem",
          boxShadow: "0 12px 14px rgba(0, 0, 0, 0.1)",
        }}
        onClick={() => {
          setSelectRange(!selectRange);
          setDate(new Date());
        }}
      >
        Select Range
      </button> */}
    </div>
  );
};

export default Actions;
