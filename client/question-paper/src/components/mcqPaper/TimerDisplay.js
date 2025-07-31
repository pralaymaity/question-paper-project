import React from "react";

const TimerDisplay = ({ timeLeft }) => {
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  return (
    <div className="fixed top-64 right-6 z-50 animate-slide-in p-4 bg-white shadow-lg border border-red-400 rounded-xl">
      <p className="text-2xl font-bold text-teal-600">
        ⏳ Time Remaining: {formatTime(timeLeft)}
      </p>
    </div>
  );
};

// React.memo will prevent unnecessary re-renders unless timeLeft changes
export default React.memo(TimerDisplay);
