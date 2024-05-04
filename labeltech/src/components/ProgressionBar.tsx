import React from 'react';

/**
 * Component that displays a progression bar with the last 10 scans.
 * @param {Array} errorData - Array containing the error data of the last 10 scans.
 */
// const ProgressionBar = ({ errorData }: { errorData: any[] }) => {
const ProgressionBar = ({ errorData }: { errorData: any[] }) => {


const bgColorForError = (errorData: any) => {
    switch (errorData) {
        case "missplacement":
            return "bg-green-500"; // Non-critical error
        case "date":
            return "bg-red-500"; // Critical error
        default:
            return "bg-green-500"; // Unknown Output
    }
};

const textForError = (errorData: any) => {
    switch (errorData) {
        case "missplacement":
            return "OK"; // Non-critical error
        case "date":
            return "X"; // Critical error
        default:
            return "OK"; // Unknown Output
    }
}

return (
    <div className="w-full p-4 bg-white rounded-lg shadow-md mt-4">
      <div className="text-center text-sm text-gray-500 mb-5">Last 10 Scans</div>
      <div className="flex justify-center items-center gap-2 overflow-hidden">
        {errorData.slice(-10).map((error, index) => (
          <div
            key={index}
            className={`h-16 w-16 ${bgColorForError(error)} rounded-full flex justify-center items-center shadow-lg ring-2 ring-white slide-in-right`}
            title={`Scan ${index + 1}: Output ${error}`}
          >
            <span className="text-sm font-bold text-white">{textForError(error)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressionBar;
