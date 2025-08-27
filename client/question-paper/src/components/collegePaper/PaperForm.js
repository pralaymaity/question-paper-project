const PaperForm = ({ handleChange }) => {
  return (
    <div>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4">
        {/* College Name (full width always) */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 md:col-span-2">
          <label className="w-full sm:w-40 font-semibold">College Name:</label>
          <input
            className="border p-2 rounded flex-1"
            name="collegeName"
            type="text"
            placeholder="Enter College Name"
            onChange={handleChange}
            required
          />
        </div>

        {/* Academic Session */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <label className="w-full sm:w-40 font-semibold">
            Academic Session:
          </label>
          <input
            className="border p-2 rounded flex-1"
            name="academicSession"
            type="text"
            placeholder="Enter Academic Session"
            onChange={handleChange}
            required
          />
        </div>

        {/* Date */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <label className="w-full sm:w-40 font-semibold">Date:</label>
          <input
            className="border p-2 rounded flex-1"
            name="date"
            type="date"
            onChange={handleChange}
            required
          />
        </div>

        {/* Time Allotted */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <label className="w-full sm:w-40 font-semibold">Time Allotted:</label>
          <input
            className="border p-2 rounded flex-1"
            name="timeAllotted"
            type="text"
            placeholder="Enter Time"
            onChange={handleChange}
            required
          />
        </div>

        {/* Paper Name */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <label className="w-full sm:w-40 font-semibold">Paper Name:</label>
          <input
            className="border p-2 rounded flex-1"
            name="paperName"
            type="text"
            placeholder="Enter Paper Name"
            onChange={handleChange}
            required
          />
        </div>

        {/* Paper Code */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <label className="w-full sm:w-40 font-semibold">Paper Code:</label>
          <input
            className="border p-2 rounded flex-1"
            name="paperCode"
            type="text"
            placeholder="Enter Paper Code"
            onChange={handleChange}
            required
          />
        </div>

        {/* Total Marks */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <label className="w-full sm:w-40 font-semibold">Total Marks:</label>
          <input
            className="border p-2 rounded flex-1"
            name="totalMarks"
            type="text"
            placeholder="Enter Total Marks"
            onChange={handleChange}
            required
          />
        </div>
      </form>
    </div>
  );
};

export default PaperForm;
