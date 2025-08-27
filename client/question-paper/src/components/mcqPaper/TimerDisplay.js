import React from "react";

const TimerDisplay = ({ timeLeft }) => {
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  return (
    <div
  className="
    fixed 
    top-20 sm:top-64   /* smaller gap on mobile, larger on bigger screens */
    right-3 sm:right-6 /* tighter to edge on mobile */
    z-50 
    animate-slide-in 
    p-2 sm:p-4         /* smaller padding on mobile */
    bg-white 
    shadow-lg 
    border border-red-400 
    rounded-lg sm:rounded-xl /* smaller rounding on mobile */
    w-40 sm:w-auto     /* reduce width on mobile */
  "
>
  <p className="text-sm sm:text-2xl font-bold text-teal-600 text-center">
    ⏳ Time: {formatTime(timeLeft)}
  </p>
</div>

  );
};

// React.memo will prevent unnecessary re-renders unless timeLeft changes
export default React.memo(TimerDisplay);
