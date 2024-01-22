import { motion } from "framer-motion";
import Calendar from "react-calendar";

interface CalendarProps {
  setDate: any;
  date: any;
  selectRange: boolean;
}
const CalendarComponent = (props: CalendarProps) => {
  const { setDate, date, selectRange } = props;
  return (
      <Calendar onChange={setDate} value={date} selectRange={selectRange} />
  );
};

export default CalendarComponent;
