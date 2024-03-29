import React from 'react';
import { useState, useEffect } from 'react';

/**
 * Component that displays a progression bar with the last 10 scans.
 * @param {Array} errorData - Array containing the error data of the last 10 scans.
 */
// const ProgressionBar = ({ errorData }: { errorData: any[] }) => {
const ProgressionBar = ({ errorData }: { errorData: any[] }) => {


const bgColorForError = (errorData: any) => {
    switch (errorData) {
        case "missplacement":
            return "bg-yellow-500"; // Non-critical error
        case "date":
            return "bg-red-500"; // Critical error
        default:
            return "bg-green-500"; // Unknown Output
    }
};

const textForError = (errorData: any) => {
    switch (errorData) {
        case "missplacement":
            return "M"; // Non-critical error
        case "date":
            return "D"; // Critical error
        default:
            return "OK"; // Unknown Output
    }
}

return (
    <div className="w-full p-4 bg-white rounded-lg shadow-md mt-5">
      <div className="flex justify-center items-center gap-2 overflow-hidden">
        {errorData.slice(-10).map((error, index) => (
          <div
            key={index}
            className={`h-10 w-10 ${bgColorForError(error)} rounded-full flex justify-center items-center shadow-lg ring-2 ring-white slide-in-right`}
            title={`Scan ${index + 1}: Output ${error}`}
          >
            <span className="text-sm font-bold text-white">{textForError(error)}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 text-center text-sm text-gray-500">Last 10 Scans</div>
    </div>
  );
};

export default ProgressionBar;
