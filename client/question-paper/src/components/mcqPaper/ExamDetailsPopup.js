import React from "react";

const ExamDetailsPopup = ({
  fullmarks,
  duration,
  examId,
  onStartExam,
  onClose,
}) => {
  if (!examId || fullmarks === undefined || duration === undefined) {
    return null;
  }

  return (
    
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full mx-4 relative">
        
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
         
        >
          &times; {/* HTML entity for 'x' */}
        </button>

        
        <div className="space-y-3 mb-6 text-gray-700">
          <p className="text-2xl">
            <span className="font-semibold">Full Marks:</span> {fullmarks}
          </p>
          <p className="text-2xl">
            <span className="font-semibold">Duration:</span> {duration} minutes
          </p>
        </div>

        
        <div className="flex justify-end space-x-4">
          
          <button
            onClick={onClose}
            className="px-5 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          
          <button
            onClick={() => onStartExam(examId)}
            className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Start Exam
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExamDetailsPopup;
