import React from 'react';
import {
    CalendarIcon
  } from "@heroicons/react/24/solid";

// Define the type for your time slot items
type TimeSlotItem = {
  line: string;
  slots: {
    start: string;
    end: string;
  }[];
};

// Mock data - replace this with your actual data source
const timeSlotData: TimeSlotItem[] = [
  { line: 'Line 1', slots: [{ start: '8:00', end: '20:00'}] },
  { line: 'Line 2', slots: [{ start: '8:00', end: '20:00'}] },
  { line: 'Line 3', slots: [{ start: '8:00', end: '20:00'}] },
  { line: 'Line 4', slots: [{ start: '8:00', end: '20:00'}] },
  { line: 'Line 5', slots: [{ start: '8:00', end: '20:00'}] },
  { line: 'Line 6', slots: [{ start: '8:00', end: '20:00'}] },
  { line: 'Line 7', slots: [{ start: '8:00', end: '20:00'}] },
  { line: 'Line 8', slots: [{ start: '8:00', end: '20:00'}] },
];


type PropsType = {
    selectedDate: Date;
};

const Timeline = (props: PropsType) => {
  return (
    <div className="timeline-container">
      <div className="date-picker">
        <div className='flex w-full justify-center'> 
            <CalendarIcon className="h-5 w-5 mr-2" />
            {props.selectedDate.toDateString()}
        </div>
      </div>
      {timeSlotData.map((item, index) => (
        <div key={index} className="line-item flex">
          <div className="line-title mr-4 w-3/12 flex items-center justify-center">{item.line}</div>
          <div className="time-slots w-full">
            {item.slots.map((slot, slotIndex) => (
              <div key={slotIndex} className="time-slot w-full">
                <div className="time-range">
                  {slot.start} - {slot.end}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timeline;
