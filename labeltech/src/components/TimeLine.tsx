import React from 'react';

// Define the type for your time slot items
type TimeSlotItem = {
  line: string;
  slots: {
    start: string;
    end: string;
    label: string;
  }[];
};

// Mock data - replace this with your actual data source
const timeSlotData: TimeSlotItem[] = [
  { line: 'Line 1', slots: [{ start: '8:00', end: '12:00', label: 'Task A' }] },
  { line: 'Line 2', slots: [{ start: '8:00', end: '12:00', label: 'Task B' }] },
  { line: 'Line 3', slots: [{ start: '8:00', end: '12:00', label: 'Task C' }] },
  { line: 'Line 4', slots: [{ start: '8:00', end: '12:00', label: 'Task D' }] },
  { line: 'Line 5', slots: [{ start: '8:00', end: '12:00', label: 'Task E' }] },
  { line: 'Line 6', slots: [{ start: '8:00', end: '12:00', label: 'Task F' }] },
  { line: 'Line 7', slots: [{ start: '8:00', end: '12:00', label: 'Task G' }] },
  { line: 'Line 8', slots: [{ start: '8:00', end: '12:00', label: 'Task H' }] },
];

const Timeline = () => {
  return (
    <div className="timeline-container">
      <div className="date-picker">
        {/* Date picker UI here */}
        <button>Day</button>
        <div>Nov 16, 2023</div>
        <button>{"<"}</button>
        <button>{">"}</button>
      </div>
      {timeSlotData.map((item, index) => (
        <div key={index} className="line-item flex">
          <div className="line-title border-black border-2 mr-4 w-3/12 text-center">{item.line}</div>
          <div className="time-slots w-full">
            {item.slots.map((slot, slotIndex) => (
              <div key={slotIndex} className="time-slot w-full">
                <div className="time-range">
                  {slot.start} - {slot.end}
                </div>
                <div className="time-label">{slot.label}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timeline;
